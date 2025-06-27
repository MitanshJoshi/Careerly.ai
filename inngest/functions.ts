import { gemini, openai } from "inngest";
import { inngest } from "./client";
import ImageKit from "imagekit";
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

var imagekit = new ImageKit({
  publicKey : `${process.env.IMAGEKIT_PUBLIC_API_KEY}`,
  privateKey : `${process.env.IMAGEKIT_PRIVATE_API_KEY}`,
  urlEndpoint : `https://ik.imagekit.io/${process.env.IMAGEKIT_ID}/`
});

export const AiResumeAnalyzerAgent = createAgent({
  name: "ai-resume-agent",
  description: "An agent that can analyze resumes and provide feedback.",
  system:`🧠 You are an advanced AI Resume Analyzer Agent.  
Your task is to evaluate a candidate’s resume and return a detailed analysis in the following structured JSON schema format.  
The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses.

📥 INPUT: I will provide a plain text resume.  
🎯 GOAL: Output a JSON report as per the schema below. The report should reflect:

overall_score (0–100)

overall_feedback (short message e.g., “Excellent”, “Needs improvement”)

summary_comment (1–2 sentence evaluation summary)

Section scores for:

Contact Info  
Experience  
Education  
Skills  

Each section should include:

score (as percentage)  
Optional comment about that section  

Tips for improvement (3–5 tips)  
What’s Good (1–3 strengths)  
Needs Improvement (1–3 weaknesses)

🔄 Output JSON Schema:  
json
{
  "overall_score": 85,
  "overall_feedback": "Excellent",
  "summary_comment": "Your resume is strong, but there are areas to refine.",
  "sections": {
    "contact_info": {
      "score": 95,
      "comment": "Perfectly structured and complete."
    },
    "experience": {
      "score": 88,
      "comment": "Strong bullet points and impact."
    },
    "education": {
      "score": 78,
      "comment": "Consider adding relevant coursework."
    },
    "skills": {
      "score": 60,
      "comment": "Expand on specific skill proficiencies."
    }
  },
  "tips_for_improvement": [
    "Add more numbers and metrics to your experience section to show impact.",
    "Integrate more industry-specific keywords relevant to your target roles.",
    "Start bullet points with strong action verbs to make your achievements stand out."
  ],
  "whats_good": [
    "Clean and professional formatting.",
    "Clear and concise contact information.",
    "Relevant work experience."
  ],
  "needs_improvement": [
    "Skills section lacks detail.",
    "Some experience bullet points could be stronger.",
    "Missing a professional summary/objective."
  ]
}
`,
  model:gemini({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
  })

})

export const AiResumeAgent = inngest.createFunction(
  { id: "ai-resume-agent" },
  { event: "ai-resume-agent" },

  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText } = await event.data;

    const uploadImageUrl = await step.run(
      "upload-image",
      async () => {
        const uploadResponse = await imagekit.upload({
          file: base64ResumeFile,
          fileName: `${Date.now()}.pdf`,
          useUniqueFileName: true,
          isPublished:true,  
        });

        return uploadResponse.url;
      }
    );
    const aiResumeReport = await AiResumeAnalyzerAgent.run(pdfText);
    return aiResumeReport;
  },
)

