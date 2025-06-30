import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: "No email found" }, { status: 400 });
    }
    try {
        const name = user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.username || "Unknown";
        const result = await db.insert(usersTable).values({
            name,
            email: user.primaryEmailAddress.emailAddress,
        }).onConflictDoNothing(); // Avoid duplicate errors
        return NextResponse.json(result);
    } catch (e) {
        return NextResponse.json({ error: (e instanceof Error ? e.message : "Unknown error") }, { status: 500 });
    }
}