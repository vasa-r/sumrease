"use client";

import React, { FormEvent, useRef, useState } from "react";
import UploadFormInput from "@/components/upload/upload-form-input";
import { fileSchema } from "@/validation/file-schema";
import { useUploadThing } from "@/utils/uploadthing";
import toast from "react-hot-toast";
import { generatePdfSummary, generatePdfText } from "@/actions/upload-action";
import { storePdfSummaryAction } from "@/lib/db";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";
import { formatFileNameAsTitle } from "@/utils/format-utils";

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload } = useUploadThing("pdfUploader", {
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

      if (!res) {
        toast.error("Failed to upload");
        return;
      }

      let storeResult;

      const fileTitle = formatFileNameAsTitle(file.name);

      const uploadFileUrl = res[0].serverData.file.url;

      console.log({ uploadFileUrl });

      toast.success("Processing PDF");

      const pdfText = await generatePdfText({
        fileUrl: uploadFileUrl,
      });

      console.log({ pdfText });

      if (!pdfText.success || !pdfText.data?.pdfText) {
        throw new Error("No pdf text");
      }

      const summaryResult = await generatePdfSummary({
        pdfText: pdfText.data.pdfText ?? "",
        fileName: fileTitle,
      });

      console.log({ summaryResult });

      const { data = null } = summaryResult || {};

      if (!data) {
        throw new Error("No summary");
      }

      if (data.summary) {
        toast.success("Summary generated successfully. Now saving it.");
        storeResult = await storePdfSummaryAction({
          fileUrl: uploadFileUrl,
          summary: data.summary,
          title: fileTitle,
          fileName: file.name,
        });
        toast.success("Summary Generated");
        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data?.id}`);
      }
    } catch (error) {
      console.error(error);
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-2xl gap-8 mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-800" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-muted-foreground text-sm">
            Upload PDF
          </span>
        </div>
      </div>
      <UploadFormInput
        loading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
      {isLoading && (
        <>
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </>
      )}
    </div>
  );
};

export default UploadForm;
