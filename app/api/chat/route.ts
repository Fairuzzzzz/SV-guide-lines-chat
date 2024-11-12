import { StreamingTextResponse } from "ai";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.API_KEY });

export const runtime = "edge";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json();
    console.log("Received messages:", messages);

    const response = await getGroqChatCompletion(messages);

    // Create stream from the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const responseText = response.choices[0]?.message?.content || "";
          console.log("AI Response:", responseText);

          // Send the response as a stream
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(responseText));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function getGroqChatCompletion(messages: Message[]) {
  try {
    // Get only the last user message
    const lastMessage = messages[messages.length - 1];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "Anda adalah asisten yang membantu mahasiswa dalam memahami hak dan kewajiban di universitas. Berikan jawaban yang ringkas, jelas dan to the point.",
        },
        lastMessage,
      ],
      temperature: 0.5,
      max_tokens: 1024,
    });

    console.log("Groq response:", completion);
    return completion;
  } catch (error) {
    console.error("Groq API error:", error);
    throw error;
  }
}
