import { CookieValueTypes, setCookie, deleteCookie } from "cookies-next";
import { getCookie } from "cookies-next/client";

export const setAuthCookie = (cookie: CookieValueTypes) => {
  const cookieValue = encodeURIComponent(
    JSON.stringify({
      accessToken: cookie,
    })
  );

  setCookie("accessToken", cookieValue, {
    maxAge: 60 * 60 * 24 * 30,
  });
};

export const getAuthCookieClient = (): {
  accessToken: string;
} | null => {
  const cookie = getCookie("accessToken");
  if (!cookie) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie as string));
  } catch {
    return null;
  }
};

export const getAuthCookieServer = async (): Promise<{
  accessToken: string;
} | null> => {
  const { cookies } = await import("next/headers");
  const cookie = (await cookies()).get("accessToken")?.value;
  if (!cookie) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie));
  } catch {
    return null;
  }
};

export const clearAuthCookie = () => {
  deleteCookie("accessToken");
};

export const deleteAuthCookieServer = async () => {
  const { cookies } = await import("next/headers");
  (await cookies()).delete("accessToken");
};
