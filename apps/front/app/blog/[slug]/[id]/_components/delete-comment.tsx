import { Button } from "@/components/ui/button";
import {
  useCommentsQuery,
  useDeleteCommentMutation,
} from "@/graphql/generated/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const DeleteComment = ({
  isAdmin,
  isOwner,
  commentId,
}: {
  isAdmin: boolean;
  isOwner: boolean;
  commentId: number;
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ slug: string; id: string }>();

  const { mutate, isPending } = useDeleteCommentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useCommentsQuery.getKey({
          postId: +id,
          page: 1,
        }),
      });

      toast.success("Comment deleted successfully");

      console.log("Comment deleted successfully");
    },

    onError: (err) => {
      console.log("Error deleting comment:", err);
      toast.error(err.message || "Something went wrong");
    },
  });
  if (!isAdmin && !isOwner) return null;
  return (
    <div>
      <Button
        size={"icon"}
        variant={"outline"}
        disabled={isPending}
        onClick={() => mutate({ deleteCommentId: commentId })}
      >
        {!isPending ? (
          <Trash2 className="text-destructive" />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </Button>
    </div>
  );
};

export { DeleteComment };
