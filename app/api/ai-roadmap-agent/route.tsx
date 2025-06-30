import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { run } from "node:test";

export async function POST(req: NextRequest  ) {
    const {roadmapId, userInput} = await req.json();
    const user = await currentUser();
    const resultIds = await inngest.send({
        name: "ai-roadmap-generator-agent",
        data:{
            userInput: userInput,
            roadmapId: roadmapId,
            userEmail:user?.primaryEmailAddress?.emailAddress
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
        if(runStatus?.data[0]?.status === "Failed"){
            return NextResponse.json({error: "Run failed"}, {status: 500});
        }
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }
    return NextResponse.json(runStatus.data?.[0]);
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