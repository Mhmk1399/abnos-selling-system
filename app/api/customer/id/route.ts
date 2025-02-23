import connect from "@/lib/data";
import { NextResponse, NextRequest } from "next/server";
import Customer from "@/models/customers";
export async function GET(request: Request) {
  await connect();
  if (!connect) {
    return NextResponse.json({ error: "connection failed" });
  }
  const id = request.headers.get("id");
  if (!id) {
    return NextResponse.json({ error: "header not found" });
  }
  try {
    const costumer = await Customer.findById(id);
    return Response.json({ costumer });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
export async function PATCH(request: NextRequest) {
  await connect();
  if (!connect) {
    return NextResponse.json({ error: "connection failed" });
  }
  const id = request.headers.get("id");
  if (!id) {
    return NextResponse.json({ error: "header not found" });
  }
  try {
    const body = await request.json();
    const costumer = await Customer.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ costumer });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  await connect();
  if (!connect) {
    return NextResponse.json({ error: "connection failed" });
  }
  const id = request.headers.get("id");
  if (!id) {
    return NextResponse.json({ error: "header not found" });
  }
  try {
    const costumer = await Customer.findByIdAndDelete(id);
    return NextResponse.json({ costumer });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
