import connect from "@/lib/data";
import { NextResponse, NextRequest } from "next/server";
import Target from "../../../models/target";
export async function POST(request: NextRequest) {
  await connect();
  if (!connect) {
    return NextResponse.json({ error: "connection failed" });
  }
  try {
    console.log(request.body);
    const target = await Target.create(request.body);
    return NextResponse.json({ target });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
export async function GET() {
  await connect();
  if (!connect) {
    return NextResponse.json({ error: "connection failed" });
  }
  try {
    const target = await Target.find();
    return NextResponse.json({ target });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
