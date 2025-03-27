"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteSummaryAction = async (summaryId: string) => {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error("User not found");
    }

    const sql = await getDbConnection();

    const deleted =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${userId} RETURNING id;`;

    if (deleted.length > 0) {
      revalidatePath("/dashboard");
      return { success: true, message: "File deleted successfully" };
    }

    return {
      success: false,
      message: "Couldn't delete file",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred during deleting summary. Try again later",
    };
  }
};
