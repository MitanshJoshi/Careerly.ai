"use client";

import Button from "@/components/CustomButton";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ResumeUploadDialog from "./ResumeUploadDialog";
import RoadmapDialog from "./RoadmapDialog";

interface AiTool {
  name: string;
  description: string;
  icon: string;
  button: string;
  path: string;
}

interface AiToolsListProps {
  aiToolsList: AiTool[];
}

const AiToolsList: React.FC<AiToolsListProps> = ({ aiToolsList }) => {
  const { user } = useUser();
  const router = useRouter();
  const [openResumeDialog, setOpenResumeDialog] = React.useState(false);
  const [roadmapDialogOpen, setRoadmapDialogOpen] = React.useState(false);

  const onClickHandler = async (tool: AiTool) => {
    if (tool.name === "AI Resume Analyzer") {
      setOpenResumeDialog(true);
      return;
    }
    if (tool.name === "Career Roadmap Generator") {
      setRoadmapDialogOpen(true);
      return;
    }
    const id = uuidv4();
    const result = await axios.post("/api/history", {
      content: [],
      recordedId: id,
      aiAgentType: tool.path,
    });
    console.log("History Recorded:", result.data);
    router.push(`${tool.path}/${id}`);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {aiToolsList.map((tool, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col h-full"
        >
          <div className="flex items-center gap-3 mb-2">
            <Image width={50} height={50} src={tool.icon} alt={tool.name} />
            <h3 className="text-xl font-semibold">{tool.name}</h3>
          </div>
          <p className="text-gray-600 mb-4 flex-1">{tool.description}</p>
          <Button onClick={() => onClickHandler(tool)}>{tool.button}</Button>
        </div>
      ))}
      <ResumeUploadDialog
        openResumeDialog={openResumeDialog}
        setOpenResumeDialog={setOpenResumeDialog}
      />
      <RoadmapDialog
        openDialog={roadmapDialogOpen}
        setRoadmapDialogOpen={setRoadmapDialogOpen}
      />
    </div>
  );
};

export default AiToolsList;
