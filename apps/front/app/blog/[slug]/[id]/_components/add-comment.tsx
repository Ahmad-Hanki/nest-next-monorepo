import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useCommentsQuery,
  useCreateCommentMutation,
  useMeQuery,
} from "@/graphql/generated/react-query";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddComment = ({ className }: { className?: string }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const { data: user } = useMeQuery();
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ slug: string; id: string }>();

  const { mutate, isPending } = useCreateCommentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useCommentsQuery.getKey({ postId: +id, page: 1 }),
      });
      toast.success("Comment added successfully");
      setOpen(false);
    },
    onError: (err) => {
      setError(err.message || "Something went wrong");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ postId: +id, createCommentInput: { content } });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Leave Your Comment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form onSubmit={handleSubmit} className={cn(className)}>
          <Label htmlFor="comment">Your Comment</Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your comment here..."
              rows={4}
            />
            {!!error && <p className="text-red-500 animate-shake">{error}</p>}
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>
            <span className="text-slate-700">{user?.me.name}</span>
          </p>
          <Button type="submit" className="mt-2" disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Comment"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
