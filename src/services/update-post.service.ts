"use server";
import { fetchApiUtil } from "@/lib/fetch-client";
import { ApiResponse, UpdatePostRequest } from "@/types/api.type";
import { revalidateTag } from "next/cache";

export async function updatePostService(
  req: UpdatePostRequest
): Promise<ApiResponse<null>> {
  try {
    const res = await fetchApiUtil({
      baseApiUrl: process.env.NEXT_PUBLIC_BASE_URL + "/posts" + req.id,
      method: "PUT",
      body: JSON.stringify({ title: req.title, content: req.content }),
    });

    revalidateTag("POST-LIST");
    revalidateTag("POST-DETAIL");

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
