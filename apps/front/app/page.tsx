import { Hero } from "@/components/hero";
import { sdk } from "@/graphql/sdk";
// import { sdk } from "@/graphql/sdk";

export default async function Home() {
  const {posts} = await sdk.Posts({}, { revalidate: 60 * 60, tags: ["posts"] });
  type PostsType = typeof posts;
  return (
    <main>
      <Hero />
    </main>
  );
}
