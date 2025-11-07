"use client";

import { useEffect } from "react";
import {
  clearAuthCookie,
  getAuthCookieClient,
  setAuthCookie,
} from "@/lib/auth-cookies";
import { sdk } from "@/graphql/sdk";

export const RefreshAccessToken = () => {
  const refreshTokenHandler = async () => {
    try {
      const cookie = getAuthCookieClient();

      if (cookie) {
        const { refreshToken: newAccessToken } = await sdk.RefreshToken({
          token: cookie.accessToken,
        });
        setAuthCookie(newAccessToken, cookie.role);
        window.location.reload();
      } else {
        clearAuthCookie();
        window.location.reload();
      }
    } catch {
      clearAuthCookie();
      window.location.reload();
    }
  };

  useEffect(() => {
    refreshTokenHandler();
  }, []);

  return null;
};
