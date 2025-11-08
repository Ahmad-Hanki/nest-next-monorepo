import { Button } from "@/components/ui/button";
import { useDeleteCommentMutation } from "@/graphql/generated/react-query";
import { Loader2, Trash2 } from "lucide-react";

const DeleteComment = ({
  isAdmin,
  isOwner,
  commentId,
}: {
  isAdmin: boolean;
  isOwner: boolean;
  commentId: number;
}) => {
  const { mutate, isPending } = useDeleteCommentMutation({});
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
