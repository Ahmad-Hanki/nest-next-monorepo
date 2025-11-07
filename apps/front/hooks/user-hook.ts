// hooks/useUser.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/graphql/generated/fetchers";

export const useUser = () => {
  const queryClient = useQueryClient();

  return {
    ...useQuery<User | null>({
      queryKey: ["user"],
      queryFn: async () => queryClient.getQueryData(["user"]) ?? null,
      staleTime: Infinity,
      enabled: false, // don’t auto-fetch
    }),
    setUser: (user: User | null) => queryClient.setQueryData(["user"], user),
  };
};
