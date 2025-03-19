"use client";

import React, { FormEvent } from "react";
import UploadFormInput from "@/components/upload/upload-form-input";
import { fileSchema } from "@/validation/file-schema";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { File } from "lucide-react";
import { generatePdfSummary } from "@/actions/upload-action";

const UploadForm = () => {
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      toast.success("Upload Success");
    },
    onUploadError: (err) => {
      toast.error(err.message || "Error while uploading file");
    },
    onUploadBegin: (fileName: string) => {
      toast.success(`${fileName} has begun to upload`);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const file = formData.get("file") as File;

    const result = fileSchema.safeParse({ file });

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || "Invalid file";
      toast.error(errorMessage);
      return;
    }

    const res = await startUpload([file]);
    console.log(res);
    if (!res) {
      toast.error("Failed to upload");
      return;
    }

    toast.success("Processing PDF");

    const summary = await generatePdfSummary(res);

    console.log(summary);
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
