import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constant/route.constant";
import HomeBodySection from "@/sections/home/home-body.section";
import Link from "next/link";

// async function fetchPosts() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
//   return res.json();
// }

export default function BlogsPage() {
  // const posts = await fetchPosts();

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold ">Blog Posts</h1>
        <Link href={ROUTES.create}>
          <Button>Create</Button>
        </Link>
      </div>
      <HomeBodySection />
    </div>
  );
}
