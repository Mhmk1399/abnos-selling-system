import connect from "@/lib/data";
import CallLog from "../../../models/callLog";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await connect();
    
    try {
        const body = await request.json();
        const callLog = await CallLog.create(body);
        return NextResponse.json({ callLog }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function GET() {
    await connect();
    try {
        const callLog = await CallLog.find();
        return NextResponse.json({ callLog });
    } catch (error) {
        return NextResponse.json({ error: error });
    }
}
