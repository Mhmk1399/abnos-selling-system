import connect from "@/lib/data";
import { NextResponse, NextRequest } from "next/server";
import Target from "../../../models/target";
export async function POST(request: NextRequest) {
  await connect();
  if (!connect) {
    return NextResponse.json({ error: "connection failed" });
  }
  try {
    const body = await request.json();
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" });
    }
    console.log(body);

    const target = await Target.create(body);
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
