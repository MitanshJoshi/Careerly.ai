import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { AiCareerChat, AiResumeAgent, AiRoadmapGenerator, AiRoadmapGeneratorAgent, helloWorld } from "../../../inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    AiCareerChat,
    AiResumeAgent,
    AiRoadmapGenerator,
  ],
});
