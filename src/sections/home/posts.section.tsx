"use client";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Blog } from "@/types/blog.type";
import PostList from "@/components/post-list";
import { getPostService } from "@/services/get-posts.service";

type PostData = {
  posts: Blog[];
  totalPosts: number;
};

export default function PostsSection() {
  const [data, setData] = useState<PostData>();
  const searchParams = useSearchParams();
  const page = useMemo(
    () => Number(searchParams.get("page") || 1),
    [searchParams.get("page")]
  );
  const searchQuery = useMemo(
    () => searchParams.get("search") || "",
    [searchParams.get("search")]
  );

  useEffect(() => {
    (async () => {
      const result = await getPostService(page, 6, searchQuery);
      setData({ posts: result.data, totalPosts: result.total });
    })();
  }, [page, searchQuery]);

  return (
    <section>
      <PostList posts={data?.posts || []} />
      <PaginationWithLinks
        page={page}
        pageSize={6}
        totalCount={data?.totalPosts || 0}
        className="mt-10 md:mt-[72px]"
      />
    </section>
  );
}
