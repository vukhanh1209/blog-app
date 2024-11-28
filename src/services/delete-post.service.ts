"use server";
import { fetchApiUtil } from "@/lib/fetch-client";
import { ApiResponse } from "@/types/api.type";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deletePostService(
  postId: string
): Promise<ApiResponse<null>> {
  try {
    const res = await fetchApiUtil({
      baseApiUrl: process.env.NEXT_PUBLIC_BASE_URL + "/posts/" + postId,
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete post");
    }
    revalidatePath("/");
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
