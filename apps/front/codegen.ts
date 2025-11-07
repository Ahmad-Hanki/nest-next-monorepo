import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8000/graphql",
  ignoreNoDocuments: true,
  generates: {
    "graphql/generated/react-query.ts": {
      documents: ["graphql/**/*.graphql"],
      plugins: [
        {
          add: {
            content: [
              "/* eslint-disable */",
              "import type { XiorError } from 'xior';",
            ].join("\n"),
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-react-query",
        "fragment-matcher",
      ],
      config: {
        dedupeFragments: true,
        exposeQueryKeys: true,
        reactQueryVersion: 5,
        fetcher: "@/graphql/xior#reactQueryFetcher",
        errorType: "XiorError",
      },
    },

    "graphql/generated/fetchers.ts": {
      documents: ["graphql/**/*.graphql"],
      plugins: [
        {
          add: {
            content: "/* eslint-disable */",
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
      config: {
        fetcher: "@/graphql/xior#sdkFetcher",
        documentMode: "string",
      },
    },
  },
};

export default config;
