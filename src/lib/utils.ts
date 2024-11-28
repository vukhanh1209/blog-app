import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReadonlyURLSearchParams } from "next/navigation";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams.toString());
  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }
  return params.toString();
};
