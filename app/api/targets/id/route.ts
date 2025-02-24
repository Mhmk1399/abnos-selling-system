import connect from "@/lib/data";
import Target from "@/models/target";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  await connect();
  if (!connect) {
    return Response.json({ error: "connection failed" });
  }
  const id = request.headers.get("id");
  if (!id) {
    return Response.json({ error: "header not found" });
  }
  try {
    const target = await Target.findOne({ saler: id }).populate({
      path: "customer",
      model: "Customers",
      select: " phones type city name",
    });
    return Response.json({ target });
  } catch (error) {
    return Response.json({ error: error });
  }
}
export async function PATCH(request: NextRequest) {
  await connect();
  if (!connect) {
    return Response.json({ error: "connection failed" });
  }
  const id = request.headers.get("id");
  if (!id) {
    return Response.json({ error: "header not found" });
  }
  try {
    const body = await request.json();
    const target = await Target.findByIdAndUpdate(id, body, { new: true });
    return Response.json({ target });
  } catch (error) {
    return Response.json({ error: error });
  }
}
export async function DELETE(request: NextRequest) {
  await connect();
  if (!connect) {
    return Response.json({ error: "connection failed" });
  }
  const id = request.headers.get("id");
  if (!id) {
    return Response.json({ error: "header not found" });
  }
  try {
    const target = await Target.findByIdAndDelete(id);
    return Response.json({ target });
  } catch (error) {
    return Response.json({ error: error });
  }
}
