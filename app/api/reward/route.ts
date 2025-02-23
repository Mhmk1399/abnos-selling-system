import connect from "@/lib/data";
import { NextRequest } from "next/server";
import Reward from "@/models/reward";
export async function GET() {
  await connect();
  if (!connect) {
    return Response.json({ error: "connection failed" });
  }
  try {
    const reward = await Reward.find().populate("customer");

    return Response.json({ reward });
  } catch (error) {
    return Response.json({ error: error });
  }
}
export async function POST(request: NextRequest) {
  await connect();
  if (!connect) {
    return Response.json({ error: "connection failed" });
  }
  try {
    const body = await request.json();
    const reward = await Reward.create(body);
    return Response.json({ reward });
  } catch (error) {
    return Response.json({ error: error });
  }
}
