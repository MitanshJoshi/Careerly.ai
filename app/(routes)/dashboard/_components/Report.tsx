import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
import React from "react";
import ResumeUploadDialog from "./ResumeUploadDialog";

interface SectionScore {
  label: string;
  score: number;
  description: string;
  color: string;
}

interface ResumeAnalysisReportProps {
  overallScore: number;
  overallRemark: string;
  overallDescription: string;
  sections: SectionScore[];
  tips: { title: string; description: string }[];
  whatsGood: string[];
  needsImprovement: string[];
  onReanalyze?: () => void;
}

const ResumeAnalysisReport: React.FC<ResumeAnalysisReportProps> = ({
  overallScore,
  overallRemark,
  overallDescription,
  sections,
  tips,
  whatsGood = [],
  needsImprovement = [],
}) => {

  const [openResumeDialog,setOpenResumeDialog] = React.useState<boolean>(false);

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">AI Analysis Results</h1>
        <Button
          onClick={()=> setOpenResumeDialog(true)}

        >
            <Sparkle />
          Re-analyze
        </Button>
      </div>
      <div className="bg-[#F8FAFC] rounded-lg p-6 mb-6 shadow">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-gray-700 font-semibold">Overall Score</div>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold text-blue-600">{overallScore}</span>
              <span className="text-xl text-gray-500 font-bold">/100</span>
            </div>
          </div>
          <div className="ml-auto text-green-600 font-bold text-lg">{overallRemark}</div>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded mt-4 mb-2">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
        <div className="text-gray-600">{overallDescription}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {sections.map((section) => {
          let borderColor = "#22C55E"; // green
          let textColor = "text-green-600";
          let remark = "Excellent!";
          if (section.score < 60) {
            borderColor = "#EF4444"; // red
            textColor = "text-red-600";
            remark = "Needs Work";
          } else if (section.score < 70) {
            borderColor = "#FACC15"; // red
            textColor = "text-red-600";
            remark = "Good";
          } else if (section.score < 80) {
            borderColor = "#FACC15"; // yellow
            textColor = "text-yellow-600";
            remark = "Very Good";
          }

          return (
            <div
              key={section.label}
              className={`rounded-lg p-4 shadow border-l-4`}
              style={{ borderColor }}
            >
              <div className="flex items-center justify-between">
                <div className="text-gray-700 font-semibold">{section.label}</div>
                <div className={`text-xs font-bold ${textColor}`}>{remark}</div>
              </div>
              <div className="flex items-end gap-2">
                <span className={`text-3xl font-bold ${textColor}`}>
                  {section.score}%
                </span>
              </div>
              <div className="text-gray-600 text-sm mt-1">{section.description}</div>
            </div>
          );
        })}
      </div>
      <div className="bg-[#F8FAFC] rounded-lg p-6 mb-6">
        <div className=" font-semibold text-2xl text-black mb-3">Tips for Improvement</div>
        <ul className="space-y-2">
          {tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-3 h-3 mt-2 rounded-full bg-blue-100 inline-block"></span>
              <div>
                <span className="font-semibold">{tip.title}</span>
                <span className="text-gray-600"> {tip.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2 mb-6">
        <div className="bg-[#F8FAFC] rounded-lg p-6 flex-1 border border-green-400">
          <div className="font-semibold  mb-3">What's Good</div>
          <div className="space-y-2 w-full">
            {whatsGood.map((item, idx) => (
              <div key={idx} className="flex items-start w-full">
                <span className=" mr-2">•</span>
                <span className="text-sm w-full break-words">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#F8FAFC] rounded-lg p-6 flex-1 border border-red-300">
          <div className="font-semibold  mb-3">Needs Improvement</div>
          <div className="space-y-2  w-full">
            {needsImprovement.map((item, idx) => (
              <div key={idx} className="flex items-start w-full">
                <span className=" mr-2">•</span>
                <span className="text-sm w-full break-words">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ResumeUploadDialog
        openResumeDialog={openResumeDialog}
        setOpenResumeDialog={setOpenResumeDialog}
      />
    </div>
  );
};

export default ResumeAnalysisReport;