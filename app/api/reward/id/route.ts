import connect from "@/lib/data";
import Reward from "@/models/reward";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
    await connect();
    if (!connect) {
        return Response.
        json({ error: "connection failed" });}
        const id = request.headers.get("id");
       if (!id) {
        return Response.json({ error: "header not found" });
       }
    try {
        const reward = await Reward.findById(id);
        return Response.json({ reward });
    }
    catch (error) {
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
        const reward = await Reward.findByIdAndUpdate(id, body, { new: true });
        return Response.json({ reward });
    }
    catch (error) {
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
        const reward = await Reward.findByIdAndDelete(id);
        return Response.json({ reward });
    }
    catch (error) {
        return Response.json({ error: error });
    }
}   