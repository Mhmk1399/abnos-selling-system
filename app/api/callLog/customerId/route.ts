    import connect from "@/lib/data";
    import { NextResponse,NextRequest } from "next/server";
    import CallLog from "@/models/callLog";
    export async function GET(request: Request) {
        await connect();
        if(!connect){
            return NextResponse.json({error:"connection failed"})
        }
        const customerId = request.headers.get("customer");
        if(!customerId){
            return NextResponse.json({error:"header not found"})
        }
        try{
            const callLog = await CallLog.find({customer:customerId}).populate(
                {
                    path: 'user',
                    model: 'User',
                    select: 'name phoneNumber role',
                }
            ).populate(
                {
                    path: 'customer',
                    model: 'Customers',
                    select: 'name phones type city comments',
                }
            );
            return NextResponse.json({callLog})
        }
        catch(error){
            return NextResponse.json({error:error})
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