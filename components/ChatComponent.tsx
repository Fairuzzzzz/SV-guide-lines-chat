"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [isTyping, setIsTyping] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTyping(true);
    handleSubmit(e).then(() => setIsTyping(false));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="p-4 bg-white dark:bg-gray-800 shadow flex items-center">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white flex-grow">
          Chat dengan AI Asisten Mahasiswa
        </h1>
      </header>
      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md p-4 rounded-lg ${m.role === "user" ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white"}`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-md p-4 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white">
              <p>AI sedang mengetik...</p>
            </div>
          </div>
        )}
      </ScrollArea>
      <form
        onSubmit={onSubmit}
        className="p-4 bg-white dark:bg-gray-800 shadow-lg"
      >
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Tanyakan tentang hak dan kewajiban Anda..."
            className="flex-grow"
          />
          <Button type="submit" disabled={isTyping}>
            Kirim
          </Button>
        </div>
      </form>
    </div>
  );
}
