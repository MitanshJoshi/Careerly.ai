"use client";

import NormalButton from "@/components/NormalButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React from "react";
import EmptyState from "./_components/EmptyState";
import axios from "axios";

type messages={
    content: string,
    role: string,
    type: string,
}
const AiChat = () => {
  const [userInput, setUserInput] = React.useState<string | null>(null);
  const[loading, setLoading] = React.useState<boolean>(false);
  const [messageList, setMessageList] = React.useState<messages[]>([]);

  const handleSend = async() => {
    setLoading(true);
    setMessageList((prev) => [
      ...prev,
      {
        content: userInput || "",
        role: "user",
        type: "text",
      },
    ]);
    setUserInput(null);
    const result = await axios.post("/api/ai-career-chat-agent", {
      userInput: userInput,
    });

    console.log("result.data is",result.data)
    setMessageList((prev) => [
      ...prev,
      result.data,
    ]);
    setLoading(false);
  }

  console.log("messageList is", messageList);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="p-4 bg-white">
          <h1 className="text-lg font-bold">AI Career Q/A Chat</h1>
          <p className="text-gray-600">
            This is a placeholder for the AI chat interface.
          </p>
          {/* Add your AI chat components here */}
        </div>
        <NormalButton>+ New Chat</NormalButton>
      </div>
      <div className="flex flex-col h-[75vh]">
            <div>
                <EmptyState onQuestionSelect={(question: string) => setUserInput(question)}/>
            </div>
            <div className="flex-1">

            </div>
            <div className="flex justify-between items-center gap-6">
                <Input value={userInput || ""} onChange={(e)=>setUserInput(e.target.value)} placeholder="Type here"/>
                <Button onClick={handleSend} disabled={loading}><Send/></Button>
            </div>
      </div>
    </div>
  );
};

export default AiChat;
