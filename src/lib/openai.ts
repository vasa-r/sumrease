import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "./prompt";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummaryFromOpenAI = async (pdfText: string) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SUMMARY_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error("OpenAI API Error:", error.status, error.message);

      if (error.status === 429) {
        console.warn("Rate limit exceeded. Try again later.");
        throw new Error("RATE_LIMIT_EXCEEDED");
      }
    } else {
      console.error("Unknown error:", error);
    }
  }
};
