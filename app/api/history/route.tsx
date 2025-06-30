import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: any){
    const {content,recordedId, aiAgentType} = await req.json();
    const user = await currentUser();
    try{
         const result = await db.insert(HistoryTable).values({
            recordId: recordedId,
            content: content,
            userEmail:user?.primaryEmailAddress?.emailAddress || "",
            createdAt: new Date().toISOString(),
            aiAgentType: aiAgentType || "unknown"
         });
        return NextResponse.json(result);

    }catch(e){
        return NextResponse.json(e); 
    } 
}

export async function PUT(req: any){
    const {recordedId, content} = await req.json();
    const user = await currentUser();
    try{
        const result = await db.update(HistoryTable).set({
            content: content,
         }).where(eq(HistoryTable.recordId, recordedId));
        return NextResponse.json(result);
    }catch(e){
        return NextResponse.json(e);
    }
}  

export async function GET(req: any){
    const {searchParams} = new URL(req.url);

    const recordId = searchParams.get("recordId");
    try{
        let result
        if (recordId) {
            result = await db.select().from(HistoryTable).where(eq(HistoryTable.recordId, recordId));
        }
        else {
            result = await db.select().from(HistoryTable).where(eq(HistoryTable.userEmail, (await currentUser())?.primaryEmailAddress?.emailAddress || "")).orderBy(desc(HistoryTable.id));
        }
        return NextResponse.json(result);
    }catch(e){
        return NextResponse.json({error: e.message}, {status: 500});
    }
}