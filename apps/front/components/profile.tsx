"use client";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

import Link from "next/link";
import { ArrowRight, List, Pencil, User } from "lucide-react";
import { useMeQuery } from "@/graphql/generated/react-query";
import { QueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { clearAuthCookie } from "@/lib/auth-cookies";

const Profile = () => {
  const { data } = useMeQuery();
  const user = data?.me;

  const queryClient = new QueryClient();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            className="rounded-full w-14 border-2 border-white"
            src={user?.avatar || undefined}
          />
          <AvatarFallback>
            <User className="w-8 text-slate-500" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-center items-center gap-3">
          <User className="w-4" />
          <p>{user?.name}</p>
        </div>
        <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4 [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md [&>*>*:nth-child(1)]:justify-self-end ">
          <span
            onClick={() => {
              clearAuthCookie();
              queryClient.removeQueries({
                queryKey: useMeQuery.getKey(),
              });

              toast.success("Logged out successfully");

              router.replace(
                `/auth/signin?redirect=${encodeURIComponent(pathname)}`
              );
            }}
          >
            <ArrowRight className="w-4" />
            <span>Sign Out</span>
          </span>
          <Link href="/user/create-post">
            <Pencil className="w-4 " />
            <span>Create New Post</span>
          </Link>
          <Link href="/user/posts">
            <List className="w-4" />
            <span>Posts</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { Profile };
