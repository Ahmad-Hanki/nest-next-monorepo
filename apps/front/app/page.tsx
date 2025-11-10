import { Hero } from "@/components/hero";
import { Posts } from "@/components/posts";
import { PostsWrapper } from "@/components/posts-wrapper";
import UserNames from "@/components/socket/components/UserNames";
import UsersOnline from "@/components/socket/components/UsersOnline";
import { PaginationProvider } from "@/context/pagination-context";
import { sdk } from "@/graphql/sdk";
// import { sdk } from "@/graphql/sdk";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const params = await searchParams;
  const { posts } = await sdk.Posts(
    {
      page: Number(params.page) || 1,
    },
    {
      revalidate: 60,
      tags: [`posts-${params.page || 1}`],
    }
  );

  return (
    <main>
      <PaginationProvider>
        <Hero />
        <UsersOnline />
        <UserNames />
        <PostsWrapper pagination={posts.pagination}>
          <Posts posts={posts.items} />
        </PostsWrapper>
      </PaginationProvider>
    </main>
  );
}
