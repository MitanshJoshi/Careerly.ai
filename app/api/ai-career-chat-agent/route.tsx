import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req:any){
    const {userInput} = await req.json();

    const resultIds = await inngest.send({
        name: "ai-career-chat",
        data:{
            userInput: userInput
        } 
    });

    const runId = resultIds?.ids[0];

    let runStatus;

    while(true){
        runStatus = await getRuns(runId);
        console.log("Run status:", runStatus);
        if(runStatus.data[0]?.status === "Completed"){
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 500)); 
    }

    const output =
        runStatus?.data &&
        Array.isArray(runStatus.data) &&
        runStatus.data[0]?.output
            ? runStatus.data[0].output
            : { error: "No output found", runStatus };

    console.log("Final runStatus:", JSON.stringify(runStatus, null, 2));

    return NextResponse.json(output);
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