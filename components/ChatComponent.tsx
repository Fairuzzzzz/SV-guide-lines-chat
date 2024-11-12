"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ArrowLeft, User, Bot } from "lucide-react";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Halo! Saya asisten AI yang siap membantu Anda memahami hak dan kewajiban mahasiswa. Silakan ajukan pertanyaan Anda.",
      },
    ],
  });
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current;
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    };
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsTyping(true);
    try {
      await handleSubmit(e);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const formatMessage = (content: string) => {
    // Handle bullet points and formatting
    return content.split("\n").map((line, i) => (
      <span key={i} className="block">
        {line.trim()}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="p-4 bg-white dark:bg-gray-800 shadow flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white flex-grow">
          SVGuideLines Chat
        </h1>
      </header>

      <div className="flex-grow overflow-hidden relative">
        <ScrollArea className="absolute inset-0 p-4" ref={scrollAreaRef}>
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.role === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user"
                      ? "bg-blue-500"
                      : "bg-gray-600 dark:bg-gray-700"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Bot className="h-5 w-5 text-white" />
                  )}
                </div>

                <div
                  className={`flex-grow max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {formatMessage(message.content)}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-700 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <form
        onSubmit={onSubmit}
        className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700"
      >
        <div className="flex space-x-2 max-w-3xl mx-auto">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Tanyakan tentang hak dan kewajiban Anda..."
            className="flex-grow"
            disabled={isTyping}
          />
          <Button type="submit" disabled={isTyping || !input.trim()}>
            Kirim
          </Button>
        </div>
      </form>
    </div>
  );
}
