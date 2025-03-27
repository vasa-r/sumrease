export interface AddSummary {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

export interface PdfSummary {
  id: string;
  user_id: string;
  original_file_url: string;
  summary_text: string;
  status: "completed" | "pending" | "failed";
  title: string;
  file_name: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}
