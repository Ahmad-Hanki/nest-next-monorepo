import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

export type NextProxy = (
  request: NextRequest,
  event: NextFetchEvent
) => Promise<NextResponse> | NextResponse;

export type ProxyFactory = (proxy: NextProxy) => NextProxy;

export type NextRequestWithUser = NextRequest & {
  user?: any;
};
