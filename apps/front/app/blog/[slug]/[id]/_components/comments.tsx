"use client";

import { CustomPagination } from "@/components/custom-pagination";
import { useCommentsQuery } from "@/graphql/generated/react-query";
import { useAuthStatus } from "@/lib/auth";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CommentCardSkeleton } from "./comment-card-skeleton";
import { CommentCard } from "./comment-card";
import AddComment from "./add-comment";

const Comments = () => {
  const { isLoggedIn } = useAuthStatus();
  const { id } = useParams<{ slug: string; id: string }>();
  const [page, setPage] = useState(1);
  const { data, isPending } = useCommentsQuery({
    postId: Number(id),
    page,
  });

  const pagination = data?.comments?.pagination;

  return (
    <div className="p-2 rounded-md shadow-md">
      <h6 className="text-lg text-slate-700 ">Comments</h6>
      {isLoggedIn && <AddComment />}
      <div className="flex flex-col gap-4">
        {isPending
          ? Array.from({ length: 12 }).map((_, index) => (
              <CommentCardSkeleton key={index} />
            ))
          : data?.comments?.items.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
      </div>
      {pagination && pagination.totalPages > 0 && (
        <CustomPagination
          onPageChange={(page) => setPage(page)}
          pagination={pagination}
        />
      )}
    </div>
  );
};

export { Comments };
