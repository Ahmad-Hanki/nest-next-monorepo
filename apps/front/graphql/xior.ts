import {
  getAuthCookieClient,
  getAuthCookieServer,
  clearAuthCookie,
  deleteAuthCookieServer,
} from "@/lib/auth-cookies";
import { realIP } from "@/lib/real-ip";
import { cache } from "react";
import xior, { XiorError } from "xior";

declare module "xior" {
  interface XiorRequestConfig {
    auth?: boolean;
  }
}

export const graphqlApi = xior.create({
  baseURL: process.env.NEXT_PUBLIC_GRAPHQL_URL || "",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// 🧩 RESPONSE INTERCEPTOR — handle global GraphQL or HTTP errors
graphqlApi.interceptors.response.use(
  (response) => response,
  async (error: XiorError) => {
    console.error("❌ GraphQL Error:", error.response?.data || error.message);

    const status = error.response?.status;
    const gqlMessage = error.response?.data?.errors?.[0]?.message;

    const isUnauthorized =
      status === 401 ||
      gqlMessage?.toLowerCase()?.includes("unauthorized") ||
      gqlMessage?.toLowerCase()?.includes("forbidden");

    if (isUnauthorized) {
      console.warn("🚨 Unauthorized detected — clearing auth cookies...");
      const IS_SERVER = typeof window === "undefined";

      try {
        if (IS_SERVER) {
          await deleteAuthCookieServer();
        } else {
          clearAuthCookie();
          // Optional: redirect user to login page (client only)
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
      } catch (err) {
        console.error("⚠️ Failed to delete auth cookies:", err);
      }
    }

    throw error;
  }
);

// 🧩 REQUEST INTERCEPTOR — attach token and headers
graphqlApi.interceptors.request.use(async (config) => {
  const IS_SERVER = typeof window === "undefined";
  const shouldAuth = config.auth === undefined || config.auth === true;
  if (!shouldAuth) return config;

  let ip;
  let cookie;

  if (IS_SERVER) {
    const { headers } = await import("next/headers");
    ip = realIP(await headers(), true);
    cookie = await getAuthCookieServer();
  } else {
    cookie = getAuthCookieClient();
  }

  config.headers = {
    ...config.headers,
    ...(cookie && { Authorization: `Bearer ${cookie.accessToken}` }),
    "X-Real-IP": ip,
  };

  return config;
});

// 🧩 Cached fetcher for server-side GraphQL queries
export const cachedFetcher = cache(
  async <TData>(
    query: string,
    variablesString?: string,
    optionsString?: string
  ): Promise<TData> => {
    const variables = variablesString ? JSON.parse(variablesString) : undefined;
    const options = optionsString ? JSON.parse(optionsString) : undefined;

    const response = await graphqlApi.post(
      "",
      { query, variables },
      { next: options }
    );

    if (response.data.errors?.length) {
      console.log("GraphQL Errors:", response.data.errors);
      throw new Error(response.data.errors[0].message);
    }

    return response.data.data;
  }
);

// 🧩 SDK fetcher (server/client)
export const sdkFetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: NextFetchRequestConfig
) =>
  cachedFetcher<TData>(
    query,
    JSON.stringify(variables),
    JSON.stringify(options)
  );

// 🧩 React Query fetcher (client)
export const reactQueryFetcher =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: NextFetchRequestConfig
  ) =>
  () =>
    cachedFetcher<TData>(
      query,
      JSON.stringify(variables),
      JSON.stringify(options)
    );
