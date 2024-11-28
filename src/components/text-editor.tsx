"use client";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import useDebounce from "@/hooks/use-debounce.hook";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditorWrapper = {
  onChange: (value: string) => void;
  error?: string;
  defaultValue?: string;
};

export default function TextEditor({
  onChange,
  error = "",
  defaultValue = "",
}: EditorWrapper) {
  const [value, setValue] = useState(defaultValue || "");
  const debounceValue = useDebounce(value, 300);
  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  return (
    <div className="mb-4">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="text-sm"
      />
      {!value && error && (
        <span className="absolute text-primary-red text-sm left-0 top-[105%]">
          {error}
        </span>
      )}
    </div>
  );
}
