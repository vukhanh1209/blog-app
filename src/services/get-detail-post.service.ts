"use server";
import { fetchApiUtil } from "@/lib/fetch-client";
import { ApiResponse } from "@/types/api.type";
import { Blog } from "@/types/blog.type";

export async function getPostDetailService(
  postId: string
): Promise<ApiResponse<Blog>> {
  try {
    const res = await fetchApiUtil({
      baseApiUrl: process.env.NEXT_PUBLIC_BASE_URL + "/posts/" + postId,
      next: {
        revalidate: 60,
        tags: ["POST-DETAIL"],
      },
    });
    const posts = await res.json();
    return {
      status: res.ok,
      message: res.statusText,
      result: res.ok ? posts : {},
    };
  } catch (error) {
    return {
      status: false,
      message: (error as Error)?.message,
      result: {},
    };
  }
}
