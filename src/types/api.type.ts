export interface ApiResponse<TData> {
  status: boolean;
  message?: string;
  result: TData;
}

export interface PaginationResponse<TData> {
  data: TData;
  total: number;
}

export type CreatePostRequest = {
  title: string;
  content: string;
};

export type UpdatePostRequest = {
  id: string;
  title: string;
  content: string;
};
