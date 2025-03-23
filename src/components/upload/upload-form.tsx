"use client";

import React, { FormEvent, useRef, useState } from "react";
import UploadFormInput from "@/components/upload/upload-form-input";
import { fileSchema } from "@/validation/file-schema";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { File } from "lucide-react";
import { generatePdfSummary } from "@/actions/upload-action";

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
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

    try {
      setIsLoading(true);
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

      const summaryResult = await generatePdfSummary(res);

      const { data = null, message = null } = summaryResult;

      if (data) {
        toast.success("Summary generated successfully. Now saving it.");
        formRef.current?.reset();
        if (data.summary) {
          // db
        }
      }
    } catch (error) {
      console.error(error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        loading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
