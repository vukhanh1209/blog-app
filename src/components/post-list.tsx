import PostItem from "@/components/post-item";
import { Blog } from "@/types/blog.type";

type Props = {
  posts: Blog[];
};

export default function PostList({ posts }: Props) {
  return (
    <section className="space-y-4">
      {posts?.map((post: Blog) => (
        <PostItem
          key={post.id}
          id={post.id}
          content={post.content}
          title={post.title}
        />
      ))}
    </section>
  );
}
