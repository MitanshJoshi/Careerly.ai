import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import axios from "axios";
import { inngest } from "@/inngest/client";
 
export async function POST(req: NextRequest)
{
    const formData = await req.formData();
    const resumeFile = formData.get('resumeFile');
    const recordId = formData.get('recordId');
    
    let loader;
    if (resumeFile instanceof Blob) {
        loader = new WebPDFLoader(resumeFile);
    } else {
        throw new Error("Invalid file type. Expected a Blob.");
    }

    const docs = await loader.load();
    console.log("Documents loaded:", docs?.[0]);

    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64=Buffer.from(arrayBuffer).toString('base64');
    const resultIds = await inngest.send({
        name: "ai-resume-agent",
        data:{
            recordId: recordId,
            base64ResumeFile: base64,
            pdfText: docs[0]?.pageContent,
        } 
    });

    const runId = resultIds?.ids[0];

    let runStatus;

    while(true){
        runStatus = await getRuns(runId);
        console.log("Run status:", runStatus);
        if(runStatus?.data[0]?.status === "Completed"){
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }
    console.log("Returning:", runStatus);
    return NextResponse.json(runStatus.data?.[0].output?.output[0]);
}

async function getRuns(runId: string) {
    console.log("Fetching runs for runId:", runId);
    
    const result = await axios.get(`${process.env.INNGEST_SERVER_HOST}/v1/events/${runId}/runs`,{
        headers: {
            Authorization: `Bearer ${process.env.INNGEST_SIGNIN_KEY}`,
        }
    }) 
    return result.data;
}