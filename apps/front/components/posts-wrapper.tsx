"use client";
import { usePaginationContext } from "@/context/pagination-context";
import { PostsQuery } from "@/graphql/generated/fetchers";
import { ReactNode } from "react";
import { CustomPagination } from "./custom-pagination";

const PostsWrapper = ({
  children,
  pagination,
}: {
  children: ReactNode;
  pagination: PostsQuery["posts"]["pagination"];
}) => {
  const { isPending, setParams } = usePaginationContext();

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };
  return (
    <>
      {isPending ? (
        <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        children
      )}

      {pagination.totalPages > 1 && (
        <CustomPagination
          onPageChange={handlePageChange}
          pagination={pagination}
        />
      )}
    </>
  );
};

export { PostsWrapper };
