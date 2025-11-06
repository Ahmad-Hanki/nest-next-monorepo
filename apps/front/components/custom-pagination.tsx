"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PostsQuery } from "@/graphql/generated/fetchers";
import { cn } from "@/lib/utils";

type CustomPaginationProps = {
  pagination: PostsQuery["posts"]["pagination"];
  onPageChange: (newPage: number) => void;
  className?: string;
};

export function CustomPagination({
  pagination,
  onPageChange,
  className,
}: CustomPaginationProps) {
  const { currentPage, totalPages } = pagination;

  if (totalPages <= 1) return null; // hide if only one page

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className={cn("mt-6", className)}>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={cn(
              "cursor-pointer",
              currentPage === 1 && "pointer-events-none opacity-40"
            )}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={cn(
              "cursor-pointer",
              currentPage === totalPages && "pointer-events-none opacity-40"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
