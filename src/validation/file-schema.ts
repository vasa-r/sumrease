import * as z from "zod";

export const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file is it" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});
