"use server";
import { fetchApiUtil } from "@/lib/fetch-client";
import { ApiResponse, CreatePostRequest } from "@/types/api.type";
import { revalidatePath } from "next/cache";

export async function createPostService(
  req: CreatePostRequest
): Promise<ApiResponse<null>> {
  try {
    const res = await fetchApiUtil({
      baseApiUrl: process.env.NEXT_PUBLIC_BASE_URL + "/posts",
      method: "POST",
      data: { title: req.title, content: req.content },
    });
    if (!res.ok) {
      throw new Error("Failed to create post");
    }
    revalidatePath("/");

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
