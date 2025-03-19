"use server";

import { fetchNExtractPdfTxt } from "@/lib/langchain";

type UploadRes = {
  serverData: {
    userId: string;
    file: {
      name: string;
      size: number;
      type: string;
      url: string;
    };
  };
}[];

export const generatePdfSummary = async (uploadResponse: UploadRes) => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { name: fileName, url: pdfUrl },
    },
  } = uploadResponse[0];

  if (!pdfUrl || !fileName) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchNExtractPdfTxt(pdfUrl);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
};
