"use server";

import { generateSummaryFromGemini } from "@/lib/gemini";
import { fetchNExtractPdfTxt } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

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

    console.log({ summary });

    return {
      success: true,
      message: "Summary generated",
      data: { summary },
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
