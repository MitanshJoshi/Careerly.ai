import { gemini, openai } from "inngest";
import { inngest } from "./client";
import { createAgent, anthropic } from '@inngest/agent-kit';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const AiCareerChatAgent = createAgent({
  name: "AiCareerChatAgent",
  description: "An agent that can answer questions about career advice, job search, and related topics.",
  system:"You are a helpful AI career advisor. Answer questions about career advice, job search, and related topics. Provide concise and accurate information.",
  model:gemini({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
  })
})

export const AiCareerChat = inngest.createFunction(
  { id: "ai-career-chat" },
  { event: "ai-career-chat" },
  async ({ event, step }) => {
    const { userInput } = await event.data;
    const result = await AiCareerChatAgent.run(userInput)
    return result;
  },
);
