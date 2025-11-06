"use client";
import { appSearchParams, AppSearchParams } from "@/utils/search-params";
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useTransition,
} from "react";
import { useQueryStates } from "nuqs";

type MainContextType = {
  isPending: boolean;
  params: AppSearchParams;
  setParams: ReturnType<typeof useQueryStates>[1];
};

export const PaginationContext = createContext<MainContextType | null>(null);

export const PaginationProvider = ({ children }: { children: ReactNode }) => {
  const [isPending, startTransition] = useTransition();
  const [searchParams, setSearchParams] = useQueryStates(appSearchParams, {
    shallow: false,
    startTransition,
  });

  const value = useMemo(() => {
    return {
      isPending,
      params: searchParams,
      setParams: setSearchParams,
    };
  }, [isPending, searchParams, setSearchParams]);

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider"
    );
  }
  return context;
};
