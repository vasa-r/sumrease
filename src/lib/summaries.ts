import { getDbConnection } from "./db";

export const getSummaries = async (userId: string) => {
  const sql = await getDbConnection();
  const summaries = sql`SELECT *, array_length(regexp_split_to_array(summary_text, '\\s+'), 1) AS word_count FROM pdf_summaries WHERE user_id = ${userId} ORDER BY created_at DESC`;
  return summaries;
};

export const getSummary = async (summaryId: string) => {
  try {
    const sql = await getDbConnection();

    const [summary] =
      await sql`SELECT *, array_length(regexp_split_to_array(summary_text, '\\s+'), 1) AS word_count FROM pdf_summaries WHERE id=${summaryId}`;

    return summary;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUploadCount = async (userId: string) => {
  const sql = await getDbConnection();

  try {
    const [result] =
      await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;

    return result.count;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
