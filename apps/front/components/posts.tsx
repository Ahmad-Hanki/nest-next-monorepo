import { Post } from "@/graphql/generated/fetchers";
import { PostCard } from "./post-card";

const Posts = ({ posts }: { posts: Partial<Post>[] }) => {
  return (
    <section className="container m-8 max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold text-center text-gray-600  leading-tight">
        Latest Posts
      </h2>
      <div className="h-1 mx-auto bg-linear-to-r from-sky-500 to-indigo-500 w-96 mb-9 rounded-t-md mt-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export { Posts };
