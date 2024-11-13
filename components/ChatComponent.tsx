"use client";

import { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ArrowLeft, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      initialMessages: [
        {
          id: "welcome",
          role: "assistant",
          content:
            "Halo! Saya asisten AI yang siap membantu Anda memahami hak dan kewajiban mahasiswa. Silakan ajukan pertanyaan Anda.",
        },
      ],
      onResponse: (response) => {
        // This ensures we're properly handling the streaming response
        if (!response.ok) {
          console.error("Response error:", response.statusText);
        }
      },
      onFinish: (message) => {
        // Handle completion of the response
        console.log("Response finished:", message);
      },
    });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessage = (content: string) => {
    return content.split("\n").map((line, i) => (
      <span key={i} className="block">
        {line.trim()}
      </span>
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
          </Link>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-2",
                message.role === "user" && "flex-row-reverse space-x-reverse",
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  message.role === "user" ? "bg-primary" : "bg-secondary",
                )}
              >
                {message.role === "user" ? (
                  <User className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <Bot className="h-5 w-5 text-secondary-foreground" />
                )}
              </div>

              <div
                className={cn(
                  "flex-grow max-w-[80%] rounded-lg px-4 py-2",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                <div className="whitespace-pre-wrap text-sm">
                  {formatMessage(message.content)}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div className="bg-secondary rounded-lg px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t bg-background p-4">
        <form
          onSubmit={handleSubmit}
          className="container flex gap-2 max-w-3xl mx-auto"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Tanyakan tentang hak dan kewajiban Anda..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Kirim
          </Button>
        </form>
      </div>
    </div>
  );
}
