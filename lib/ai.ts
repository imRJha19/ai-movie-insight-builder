"use server";

import Groq from "groq-sdk";
import { EnvConfigError, getRequiredEnv } from "@/lib/env";

function isLikelyGroqKey(value: string): boolean {
  return /^gsk_[A-Za-z0-9_-]{20,}$/.test(value);
}

function getSafeErrorMessage(error: unknown): string {
  const maybeError = error as { status?: number; error?: { code?: string } };
  const isUnauthorized =
    maybeError?.status === 401 || maybeError?.error?.code === "invalid_api_key";

  if (isUnauthorized) {
    return "AI analysis unavailable: invalid GROQ_API_KEY configuration.";
  }

  if (error instanceof EnvConfigError) {
    return `AI analysis unavailable: ${error.message}.`;
  }

  return "AI analysis currently unavailable.";
}

export async function getMovieSentiment(
  movieTitle: string,
  plot: string
): Promise<string> {
  try {
    if (!movieTitle || !plot) {
      return "Not enough information for AI analysis.";
    }

    const groqApiKey = getRequiredEnv("GROQ_API_KEY");
    if (!isLikelyGroqKey(groqApiKey)) {
      throw new EnvConfigError(
        "GROQ_API_KEY has invalid format (expected a raw key that starts with gsk_)"
      );
    }

    const client = new Groq({
      apiKey: groqApiKey,
    });

    const prompt = `Movie: "${movieTitle}"

Plot:
${plot}

Give:
1. 3 short sentences describing the movie vibe.
2. End with: Classification: Positive, Mixed, or Negative.`;

    const completion = await client.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: "You are a concise movie critic AI.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "No AI analysis available.";

    return result;
  } catch (error) {
    console.error("AI Error:", error);
    return getSafeErrorMessage(error);
  }
}
