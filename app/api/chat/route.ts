import { StreamingTextResponse, Message } from "ai";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.API_KEY });

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "Anda adalah asisten yang membantu mahasiswa dalam memahami hak dan kewajiban di universitas. Berikan jawaban yang ringkas, jelas dan to the point.",
        },
        ...messages, // Kirim semua pesan untuk konteks yang lebih baik
      ],
      temperature: 0.5,
      max_tokens: 1024,
      stream: true, // Aktifkan streaming
    });

    // Ubah response Groq menjadi ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content || "";
          const queue = new TextEncoder().encode(text);
          controller.enqueue(queue);
        }
        controller.close();
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in chat completion:", error);
    return new Response(
      JSON.stringify({ error: "There was an error processing your request" }),
      { status: 500 },
    );
  }
}
