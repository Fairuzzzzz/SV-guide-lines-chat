"use client";

import { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      streamProtocol: "text",
      initialMessages: [
        {
          id: "welcome",
          role: "assistant",
          content:
            "Halo! Saya asisten AI yang siap membantu Anda memahami hak dan kewajiban mahasiswa. Silakan ajukan pertanyaan Anda.",
        },
      ],
      onResponse: (response) => {
        console.log("Chat response received:", response);
      },
      onFinish: (message) => {
        console.log("Chat message finished:", message);
      },
      onError: (error) => {
        console.error("Chat error:", error);
      },
    });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log("Current messages:", messages);
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
            <span>Kembali</span>
          </Link>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message) => {
            console.log("Rendering message:", message);
            return (
              <Card
                key={message.id}
                className={cn(
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                <CardContent className="p-4 flex items-start space-x-2">
                  <div
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                      message.role === "user"
                        ? "bg-primary-foreground"
                        : "bg-secondary-foreground",
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5 text-primary" />
                    ) : (
                      <Bot className="h-5 w-5 text-secondary" />
                    )}
                  </div>
                  <div className="flex-grow min-h-[28px] flex items-center">
                    <div className="whitespace-pre-wrap text-sm">
                      {formatMessage(message.content)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {isLoading && (
            <Card className="bg-secondary">
              <CardContent className="p-4 flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary-foreground flex items-center justify-center">
                  <Bot className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex items-center h-8 px-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </CardContent>
            </Card>
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
