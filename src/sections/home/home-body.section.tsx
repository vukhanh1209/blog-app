"use client";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, useTransition } from "react";
import { Blog } from "@/types/blog.type";
import PostList from "@/components/post-list";
import { getPostService } from "@/services/get-posts.service";

type PostData = {
  posts: Blog[];
  totalPosts: number;
};

export default function HomeBodySection() {
  const [data, setData] = useState<PostData>();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const page = useMemo(
    () => Number(searchParams.get("page") || 1),
    [searchParams.get("page")]
  );

  useEffect(() => {
    startTransition(async () => {
      const res = await getPostService(page, 6);
      setData({
        posts: res.data,
        totalPosts: res.total,
      });
    });
  }, [page]);

  if (isPending) {
    return <div className="text-black text-lg animate-pulse">Loading...</div>;
  }

  return (
    <section>
      <PostList posts={data?.posts || []} />
      <Suspense fallback={<div>...</div>}>
        <PaginationWithLinks
          page={page}
          pageSize={6}
          totalCount={data?.totalPosts || 0}
          className="mt-10 md:mt-[72px]"
        />
      </Suspense>
    </section>
  );
}
