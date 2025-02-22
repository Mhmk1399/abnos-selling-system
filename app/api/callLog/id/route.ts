    import connect from "@/lib/data";
    import { NextResponse,NextRequest } from "next/server";
    import CallLog from "@/models/callLog";
    export async function GET(request: Request,response: NextResponse) {
        await connect();
        if(!connect){
            return NextResponse.json({error:"connection failed"})
        }
        const id = request.headers.get("id");
        if(!id){
            return NextResponse.json({error:"header not found"})
        }
        try{
            const callLog = await CallLog.findById(id);
            return Response.json({callLog})
        }
        catch(error){
            return Response.json({error:error})
        }
    }
    export async function PATCH(request: NextRequest) {
        await connect();
        if(!connect){
            return NextResponse.json({error:"connection failed"})
        }
        const id = request.headers.get("id");
        if(!id){
            return NextResponse.json({error:"header not found"})
        }
        try{
            const body = await request.json();
            const callLog = await CallLog.findByIdAndUpdate(id, body, {new:true});
            return NextResponse.json({callLog})
        }
        catch(error){
            return NextResponse.json({error:error})
        }
    }
    export async function DELETE(request: NextRequest) {
        await connect();
        if(!connect){
            return NextResponse.json({error:"connection failed"})
        }
        const id = request.headers.get("id");
        if(!id){
            return NextResponse.json({error:"header not found"})
        }
        try{
            const callLog = await CallLog.findByIdAndDelete(id);
            return NextResponse.json({callLog})
        }
        catch(error){
            return NextResponse.json({error:error})
        }
    }