import { StreamingTextResponse } from "ai";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.API_KEY });

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await getGroqChatCompletion(messages);

  // Mengubah response menjadi ReadableStream
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        controller.enqueue(chunk.choices[0]?.delta?.content || "");
      }
      controller.close();
    },
  });

  return new StreamingTextResponse(stream);
}

export async function getGroqChatCompletion(messages: any) {
  return groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content:
          "Anda adalah asisten yang membantu mahasiswa dalam memahami hak dan kewajiban mereka di universitas",
      },
      ...messages,
    ],
    stream: true, // Mengaktifkan streaming
  });
}
