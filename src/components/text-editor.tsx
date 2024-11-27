"use client";
import { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

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

  useEffect(() => {
    const changeValueTimeout = setTimeout(() => {
      onChange(value);
    }, 500);
    return () => {
      clearTimeout(changeValueTimeout);
    };
  }, [value]);

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
