"use server";

import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";
import { AddSummary } from "../../types/type";
import { revalidatePath } from "next/cache";

export const getDbConnection = async () => {
  if (!process.env.NEON_DB_URI) {
    throw new Error("No DB URI");
  }

  const sql = await neon(process.env.NEON_DB_URI);

  return sql;
};

const savePdfSummaryDB = async ({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: AddSummary) => {
  try {
    const sql = await getDbConnection();

    const savedSummary = await sql`INSERT INTO pdf_summaries (
      user_id, 
      original_file_url, 
      summary_text, 
      title, 
      file_name
  ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
  ) RETURNING *;`;

    return savedSummary[0];
  } catch (error) {
    console.log("Error saving pdf summary", error);
    throw error;
  }
};

export const storePdfSummaryAction = async ({
  fileUrl,
  summary,
  title,
  fileName,
}: Omit<AddSummary, "userId">) => {
  let savePdfSummary;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }

    savePdfSummary = await savePdfSummaryDB({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    console.log({ savePdfSummary });

    if (!savePdfSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving pdf summary",
    };
  }

  revalidatePath(`/summaries/${savePdfSummary.id}`);

  return {
    success: true,
    message: "Pdf summary saved successfully",
    data: {
      id: savePdfSummary.id,
    },
  };
};
