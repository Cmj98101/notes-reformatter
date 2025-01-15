import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

interface OpenAIRequestBody {
  prompt: string;
}

export async function POST(req: Request) {
  const { prompt }: OpenAIRequestBody = await req.json();

  // Validate the prompt input
  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json(
      { error: "Invalid or missing prompt" },
      { status: 400 }
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Your Job is to be my professional note taker. You take my notes and re-organize my thoughts and make them more readable short sentences. Make sure with every thought you put similar topics together and add a topic for it.Make sure to always add spaces between topics.  Try and re-organize the following and dont and anything extra. "${prompt}"`,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    return NextResponse.json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
