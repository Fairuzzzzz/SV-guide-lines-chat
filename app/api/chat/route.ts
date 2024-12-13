import { StreamingTextResponse, Message } from "ai";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.API_KEY });

export const runtime = "edge";

// Use an environment variable to store the rules
const rulesData = JSON.parse(process.env.AI_RULES || "{}");

// Define our own types if Groq SDK doesn't export them
type ChatCompletionRole = "system" | "user" | "assistant";
type ChatCompletionMessage = {
  role: ChatCompletionRole;
  content: string;
};

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  try {
    // Construct the system message with rules
    const systemMessage: ChatCompletionMessage = {
      role: "system",
      content: `Anda adalah asisten yang membantu mahasiswa dalam memahami hak dan kewajiban di Sekolah Vokasi Universitas Gadjah Mada.
      Gunakan informasi berikut sebagai panduan untuk menjawab pertanyaan:
      ${JSON.stringify(rulesData)}

      Berikan jawaban yang ringkas, jelas, dan to the point berdasarkan peraturan di atas.
      Jika ada pertanyaan di luar cakupan peraturan ini, katakan bahwa informasi tersebut tidak tersedia dalam peraturan yang ada.
      Jika pertanyaan masih di cakupan Hak dan Kewajiban sebagai mahasiswa, jawablah secara universal`,
    };

    // Convert messages to the format expected by Groq
    const groqMessages: ChatCompletionMessage[] = messages.map((msg) => ({
      role: msg.role as ChatCompletionRole,
      content: msg.content,
    }));

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [systemMessage, ...groqMessages],
      temperature: 0.5,
      max_tokens: 1024,
      stream: true,
    });

    // Convert Groq response to ReadableStream
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
