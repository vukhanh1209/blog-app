export type FetchApiProps = RequestInit &
  NextFetchRequestConfig & {
    baseApiUrl: string;
    params?: Record<string, string>;
    data?: Record<string, string[] | string | number>;
  };

export async function fetchApiUtil({
  method = "GET",
  revalidate = 60,
  params,
  tags,
  data = {},
  headers,
  baseApiUrl,
}: FetchApiProps) {
  const searchParams = new URLSearchParams(params);
  const searchParamsString = params ? "?" + searchParams.toString() : "";
  const response = await fetch(`${baseApiUrl}${searchParamsString}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    } as HeadersInit,
    body: method.toUpperCase() === "GET" ? undefined : JSON.stringify(data),
    next: {
      revalidate,
      tags,
    },
  });

  return response;
}
