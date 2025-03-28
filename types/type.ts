import { NeonQueryFunction } from "@neondatabase/serverless";
import Stripe from "stripe";

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

export interface CreateOrUpdateUser {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
}

export interface UserWithSql extends CreateOrUpdateUser {
  sql: NeonQueryFunction<false, false>;
}

export interface PaymentWithSql {
  sql: NeonQueryFunction<false, false>;
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
}
