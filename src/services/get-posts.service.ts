"use server";
import { fetchApiUtil } from "@/lib/fetch-client";
import { PaginationResponse } from "@/types/api.type";
import { Blog } from "@/types/blog.type";

export async function getPostService(
  page?: number,
  pageSize?: number,
  search?: string
): Promise<PaginationResponse<Blog[]>> {
  try {
    const res = await fetchApiUtil({
      baseApiUrl: process.env.NEXT_PUBLIC_BASE_URL + "/posts",
      next: {
        tags: ["POST-LIST", String(page), String(search), String(pageSize)],
      },
      params: {
        page: String(page || 1),
        pageSize: String(pageSize || 6),
        search: search || "",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

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
