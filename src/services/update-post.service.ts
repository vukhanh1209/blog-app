"use server";
import { fetchApiUtil } from "@/lib/fetch-client";
import { ApiResponse, UpdatePostRequest } from "@/types/api.type";
import { revalidatePath } from "next/cache";

export async function updatePostService(
  req: UpdatePostRequest
): Promise<ApiResponse<null>> {
  try {
    const res = await fetchApiUtil({
      baseApiUrl: process.env.NEXT_PUBLIC_BASE_URL + "/posts/" + req.id,
      method: "PUT",
      data: { title: req.title, content: req.content },
    });
    if (!res.ok) {
      throw new Error("Failed to update post");
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
