"use server";
import { fetchApiUtil } from "@/lib/fetch-client";
import { ApiResponse, PaginationResponse } from "@/types/api.type";
import { Blog } from "@/types/blog.type";

export async function getPostService(
  page?: number,
  pageSize?: number
): Promise<PaginationResponse<Blog[]>> {
  try {
    const res = await fetchApiUtil({
      baseApiUrl: process.env.NEXT_PUBLIC_BASE_URL + "/posts",
      next: {
        revalidate: 60,
        tags: ["POST-LIST"],
      },
      params: {
        page: String(page || 1),
        pageSize: String(pageSize || 6),
      },
    });
    const posts = await res.json();
    return {
      data: posts?.data || [],
      total: posts?.totalPosts || 0,
    };
  } catch {
    return {
      data: [],
      total: 0,
    };
  }
}
