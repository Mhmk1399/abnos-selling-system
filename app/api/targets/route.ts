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
    const salers = body.saler;
    console.log(salers, "salers");

    if (!body) {
      return NextResponse.json({ error: "Invalid request body" });
    }
    console.log(body, "body");

    await Target.create(body);

    return NextResponse.json({ status: "success" });
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
