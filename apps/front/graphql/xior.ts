import { getAuthCookieClient, getAuthCookieServer } from "@/lib/auth-cookies";
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

graphqlApi.interceptors.response.use(
  (response) => response,
  (error: XiorError) => {
    console.error("❌ GraphQL Error:", error.response?.data || error.message);
    throw error;
  }
);

graphqlApi.interceptors.request.use(async (config) => {
  const IS_SERVER = typeof window == "undefined";

  // Default to true if auth is not specified
  const shouldAuth = config.auth == undefined || config.auth == true;

  if (!shouldAuth) {
    return config;
  }

  let ip;
  let cookie;
  if (IS_SERVER) {
    const { headers } = await import("next/headers");
    ip = realIP(await headers(), true);
    cookie = await getAuthCookieServer();
  } else {
    cookie = getAuthCookieClient();
  }
  console.log("🚀 Sending headers:", config.headers);

  config.headers = {
    ...config.headers,
    ...(cookie && { Authorization: `Bearer ${cookie.accessToken}` }),
    "X-Real-IP": ip,
  };

  return config;
});

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

// SDK fetcher: returns a Promise directly
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

// React Query fetcher: returns a function
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
