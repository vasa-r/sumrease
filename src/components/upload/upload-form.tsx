"use client";

import React, { FormEvent } from "react";
import UploadFormInput from "@/components/upload/upload-form-input";
import { fileSchema } from "@/validation/file-schema";

const UploadForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const file = formData.get("file") as File;

    console.log("file", file);

    const result = fileSchema.safeParse({ file });
    console.log("result", result);

    if (!result.success) {
      console.log(result.error.issues[0] ?? "Invalid file");
      return;
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
