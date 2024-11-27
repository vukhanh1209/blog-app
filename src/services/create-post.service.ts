"use server";
import { fetchApiUtil } from "@/lib/fetch-client";
import { ApiResponse, CreatePostRequest } from "@/types/api.type";
import { revalidateTag } from "next/cache";

export async function createPostService(
  req: CreatePostRequest
): Promise<ApiResponse<null>> {
  try {
    const res = await fetchApiUtil({
      baseApiUrl: process.env.NEXT_PUBLIC_BASE_URL + "/posts",
      method: "POST",
      data: { title: req.title, content: req.content },
    });

    revalidateTag("POST-LIST");

    return {
      status: res.ok,
      message: res.statusText,
      result: null,
    };
  } catch (error) {
    return {
      status: false,
      message: (error as Error)?.message,
      result: null,
    };
  }
}
