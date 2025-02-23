import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";
import Customer from "@/models/customer";
import customer from "@/models/customer";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const body = await request.json();
    const costumer = await Customer.create(body);
    return NextResponse.json({ costumer }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connect();
  try {
    const customer = await Customer.find();
    return NextResponse.json({ customer }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
