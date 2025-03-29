"use server";

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchNExtractPdfTxt } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

// type UploadRes = {
//   serverData: {
//     userId: string;
//     file: {
//       name: string;
//       size: number;
//       type: string;
//       url: string;
//     };
//   };
// }[];

export const generatePdfText = async ({ fileUrl }: { fileUrl: string }) => {
  if (!fileUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchNExtractPdfTxt(fileUrl);

    if (!pdfText) {
      return {
        success: false,
        message: "Failed to fetch and extract pdf text.",
        data: null,
      };
    }

    return {
      success: true,
      message: "Pdf text extracted",
      data: { pdfText },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to fetch and extract pdf text.",
      data: null,
    };
  }
};

// export const

export const generatePdfSummary = async ({
  pdfText,
  fileName,
}: {
  pdfText: string;
  fileName: string;
}) => {
  try {
    let summary;

    try {
      summary = await generateSummaryFromOpenAI(pdfText);
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message === "RATE_LIMIT_EXCEEDED") {
        try {
          summary = await generateSummaryFromGemini(pdfText);
        } catch (geminiError) {
          console.error({ geminiError });
          throw new Error(
            "Failed to generate summary with available AI providers"
          );
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Failed to generate summary",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated",
      data: { title: fileName, summary },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }
};
