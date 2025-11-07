import { useMeQuery } from "@/graphql/generated/react-query";
import { getAuthCookieClient } from "./auth-cookies";

export const useAuthStatus = () => {
  const cookie = getAuthCookieClient();
  useMeQuery(undefined, {
    enabled: !!cookie,
  });

  if (!cookie) return { isLoggedIn: false, isAdmin: false };

  return {
    isLoggedIn: !!cookie,
    isAdmin: cookie?.role,
  };
};
