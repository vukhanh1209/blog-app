"use client";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce.hook";
import { createQueryString } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function SearchPostSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );

  const debouncedValue = useDebounce(inputValue, 500);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    router.push(
      pathname +
        "?" +
        createQueryString(searchParams, "search", debouncedValue),
      { scroll: false }
    );
  }, [debouncedValue]);

  return (
    <div className="mb-10">
      <Input
        type="text"
        placeholder="Search posts..."
        value={inputValue}
        onChange={handleInputChange}
        className="w-full"
      />
    </div>
  );
}
