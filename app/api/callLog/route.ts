    import connect from "@/lib/data";
    import { NextApiRequest, NextApiResponse } from "next";
    import CallLog from "../../../models/callLog";
    export  async function POST(request: NextApiRequest, Response: NextApiResponse) {
        await connect();
        if(!connect){
            return Response.json({error:"connection failed"})
        }
        try{
            console.log(request.body)
            const callLog = await CallLog.create(request.body);
            return Response.json({callLog})
            }
            catch(error){
            return Response.json({error:error})
            }
        
        }

    export  async function GET( Response: NextApiResponse) {
                await connect();
                if(!connect){
                    return Response.json({error:"connection failed"})
                }
                try{
                    const callLog = await CallLog.find();
                    return Response.json({callLog})
                }
                catch(error){
                    return Response.json({error:error})
                }
            }           