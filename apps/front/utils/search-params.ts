import { parseAsInteger, createLoader, createSerializer } from "nuqs/server";

export const appSearchParams = {
  page: parseAsInteger.withDefault(1),
};

export const loadSearchParams = createLoader(appSearchParams);

export type AppSearchParams = Awaited<ReturnType<typeof loadSearchParams>>;

export const serializeSearchParams = createSerializer(appSearchParams);
