import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentsQuery } from "@/graphql/generated/fetchers";
import { User } from "lucide-react";
import { DeleteComment } from "./delete-comment";
import { useMeQuery } from "@/graphql/generated/react-query";

type Props = {
  comment: CommentsQuery["comments"]["items"][0];
};
const CommentCard = ({ comment }: Props) => {
  const { data: meData } = useMeQuery();
  return (
    <div className="p-2 shadow rounded">
      <div className="flex justify-between gap-3 items-center">
        <div className="flex gap-2 text-slate-500 items-center">
          <Avatar className="border-2">
            <AvatarImage src={comment.author?.avatar ?? undefined} />
            <AvatarFallback>
              <User className="w-8" />
            </AvatarFallback>
          </Avatar>
          <p>{comment.author?.name} | </p>
          <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
        </div>
        <DeleteComment
          commentId={comment.id}
          isAdmin={meData?.me.role == "ADMIN"}
          isOwner={meData?.me.id === comment.author?.id}
        />
      </div>
      <p className="mt-4">{comment.content}</p>
    </div>
  );
};

export { CommentCard };
