import { Hero } from "@/components/hero";
import { Posts } from "@/components/posts";
import { sdk } from "@/graphql/sdk";
// import { sdk } from "@/graphql/sdk";

export default async function Home() {
  const { posts } = await sdk.Posts(
    {},
    {
      revalidate: 60,
      tags: ["posts"],
    }
  );
  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
}
