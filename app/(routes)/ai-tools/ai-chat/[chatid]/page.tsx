"use client";

import NormalButton from "@/components/NormalButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import React, { useRef, useEffect } from "react";
import {v4 as uuid4} from "uuid";
import EmptyState from "../_components/EmptyState";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type messages = {
  content: string;
  role: string;
  type: string;
};

const AiChat = () => {
  const [userInput, setUserInput] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [apiLoading, setApiLoading] = React.useState<boolean>(false);
  const [messageList, setMessageList] = React.useState<messages[]>([]);
  const {chatid} = useParams();
  const router = useRouter();
  console.log("Chat ID:", chatid);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList, loading]);

  useEffect(() => {
    messageList.length>0 && updateMessageList(); 
  }, [messageList])

  const updateMessageList = async() => {
    const result = await axios.put('/api/history',{
      content: messageList,
      recordedId: chatid,
    });
    console.log(result);
  }

  useEffect(() => {
    chatid && getMessageList();
  }, [chatid]);

  const getMessageList = async () => {
    setApiLoading(true);
    const result = await axios.get("/api/history", {
      params: {
        recordId: chatid,
      },
    });

    console.log("Fetched Messages:", result.data);
    if (result.data.length > 0) {
      setMessageList(result.data[0].content);
    }
    setApiLoading(false);
  }
  

  const handleSend = async () => {
    if (!userInput?.trim()) return;
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
    try {
      const result = await axios.post("/api/ai-career-chat-agent", {
        userInput: userInput,
      });
      setMessageList((prev) => [...prev, result.data]);
    } catch (e) {
      setMessageList((prev) => [
        ...prev,
        {
          content: "Sorry, something went wrong.",
          role: "assistant",
          type: "text",
        },
      ]);
    }
    setLoading(false);
  };

  const onNewChatClick = async () => {
    setApiLoading(true);
    const newchatid = uuid4(); 
    const result = await axios.post("/api/history", {
      recordedId: newchatid,
      content: [],
    });
    setApiLoading(false);
    router.replace(`/ai-tools/ai-chat/${newchatid}`);
  }

  if(apiLoading)
  {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="p-4 bg-white">
          <h1 className="text-lg font-bold">AI Career Q/A Chat</h1>
          <p className="text-gray-600">
            This is a placeholder for the AI chat interface.
          </p>
        </div>
        <Button onClick={onNewChatClick}>+ New Chat</Button>
      </div>
      <div className="flex flex-col h-[75vh]">
        {messageList.length === 0 && (
          <div>
            <EmptyState
              onQuestionSelect={(question: string) => setUserInput(question)}
            />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-2 py-4">
          {messageList.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-4 my-2 rounded-2xl shadow ${
                  message.role === "user"
                    ? "bg-blue-100 text-blue-800 max-w-[70%] self-end"
                    : "bg-gray-50 text-gray-900 w-full"
                }`}
                style={
                  message.role === "user"
                    ? { borderTopRightRadius: 0 }
                    : { borderTopLeftRadius: 0 }
                }
              >
                <p className="font-semibold mb-2">
                  {message.role === "user" ? "You" : "AI Assistant"}:
                </p>
                {message.role === "assistant" ? (
                  <div className="prose prose-sm sm:prose-base">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-line">{message.content}</p>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="p-4 my-2 rounded-2xl shadow bg-gray-50 text-gray-900 w-full">
                <p className="font-semibold mb-2">AI Assistant:</p>
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                  <span className="ml-2 text-gray-400">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="flex justify-between items-center gap-6 mt-2">
          <Input
            value={userInput || ""}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type here"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleSend();
            }}
          />
          <Button onClick={handleSend} disabled={loading || !userInput?.trim()}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
