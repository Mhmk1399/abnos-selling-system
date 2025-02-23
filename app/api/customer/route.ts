import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";
import Customer from "@/models/customer";

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
    const costumers = await Customer.find();
    return NextResponse.json({ costumers });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
