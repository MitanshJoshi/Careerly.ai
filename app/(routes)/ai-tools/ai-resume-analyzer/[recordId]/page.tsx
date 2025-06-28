"use client";

import ResumeAnalysisReport from '@/app/(routes)/dashboard/_components/Report';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AiResumeAnalyzer = () => {
    const [pdfUrl, setPdfUrl] = useState("")
    const [aiReport, setAiReport] = useState<any>(null);
    const {recordId} = useParams();

    const getResumeReport = async () => {
      const result = await axios.get(`/api/history?recordId=${recordId}` );

      console.log("Resume Report:", result.data[0]);
      if (result.data) {
        setPdfUrl(result.data[0].metadata);
        setAiReport(result.data[0].content);

        console.log("AI Report:", result.data[0].content);
      } else {
        console.error("No metadata found in the response");
      }
    }

    useEffect(()=>{
    if (recordId) {
        getResumeReport();
      }
    },[recordId])

  // Helper to convert sections object to array with labels and colors
  function getSectionsArray(sectionsObj: any) {
    if (!sectionsObj) return [];
    return [
      {
        label: "Contact Info",
        score: sectionsObj.contact_info?.score ?? 0,
        description: sectionsObj.contact_info?.comment ?? "",
        color: "#22C55E",
      },
      {
        label: "Experience",
        score: sectionsObj.experience?.score ?? 0,
        description: sectionsObj.experience?.comment ?? "",
        color: "#22C55E",
      },
      {
        label: "Education",
        score: sectionsObj.education?.score ?? 0,
        description: sectionsObj.education?.comment ?? "",
        color: "#FACC15",
      },
      {
        label: "Skills",
        score: sectionsObj.skills?.score ?? 0,
        description: sectionsObj.skills?.comment ?? "",
        color: "#EF4444",
      },
    ];
  }

  return (
    <div className='grid lg:grid-cols-5 grid-cols-1 gap-6 h-[95vh]'>
      <div className='col-span-2 h-full overflow-auto pr-2'>
        {aiReport && (
          <ResumeAnalysisReport
            overallScore={aiReport.overall_score}
            overallRemark={aiReport.overall_feedback}
            overallDescription={aiReport.summary_comment}
            sections={getSectionsArray(aiReport.sections)}
            tips={aiReport.tips_for_improvement}
            whatsGood={aiReport.whats_good || []}
            needsImprovement={aiReport.needs_improvement || []}
            onReanalyze={() => window.location.reload()}
          />
        )}
      </div>
      <div className='col-span-3 h-full overflow-auto pl-2 flex flex-col'>
        <h2 className='font-bold text-2xl mb-5'>Resume Preview</h2>
        <div className="flex-1">
          <iframe 
            src={pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0"}
            width="100%"
            height="100%"
            title="Resume Preview"
            style={{ border: 'none', height: '100%' }}
          ></iframe>
        </div>
      </div>
    </div>
  )
}  

export default AiResumeAnalyzer