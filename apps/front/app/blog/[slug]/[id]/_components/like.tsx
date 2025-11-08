"use client";

import { revalidateTagService } from "@/actions/revalidate-server-tag";
import {
  usePostQuery,
  useToggleLikeMutation,
} from "@/graphql/generated/react-query";
import { useAuthStatus } from "@/lib/auth";
import { Heart, HeartOff } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  postId: number;
  likedByUserId?: boolean | null;
  likeCount?: number;
};
const Like = (props: Props) => {
  const { isLoggedIn } = useAuthStatus();
  const { mutate } = useToggleLikeMutation({
    onSuccess: async (success) => {
      console.log("Like toggled:", success);
      revalidateTagService("post-" + props.postId);
      toast.success(success.toggleLike ? "Post liked!" : "Like removed!");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });
  return (
    <div className="mt-3 flex items-center justify-start gap-2">
      {props.likedByUserId ? (
        <button
          onClick={() =>
            mutate({
              createLikeInput: {
                postId: props.postId,
              },
            })
          }
        >
          <Heart className="w-6 text-rose-600" />
        </button>
      ) : (
        <button
          onClick={() => {
            if (!isLoggedIn) {
              toast.error("You must be logged in to like a post");
              return;
            }
            mutate({ createLikeInput: { postId: props.postId } });
          }}
        >
          <HeartOff className="w-6" />
        </button>
      )}
      <p className="text-slate-600">{props.likeCount}</p>
    </div>
  );
};

export default Like;
