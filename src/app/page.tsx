import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constant/route.constant";
import PostsSection from "@/sections/home/posts.section";
import SearchPostSection from "@/sections/home/search-post.section";
import Link from "next/link";
import { Suspense } from "react";

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold ">Blog Posts</h1>
        <Link href={ROUTES.create}>
          <Button>Create</Button>
        </Link>
      </div>
      <Suspense fallback={<div>...</div>}>
        <SearchPostSection />
      </Suspense>
      <Suspense fallback={<div>...</div>}>
        <PostsSection />
      </Suspense>
    </div>
  );
}
