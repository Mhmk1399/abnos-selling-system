import connect from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import Target from "../../../models/target";
export  async function POST(request: NextApiRequest, Response: NextApiResponse) {
    await connect();
    if(!connect){
        return Response.json({error:"connection failed"})
    }
    try{
        console.log(request.body)
        const target = await Target.create(request.body);
        return Response.json({target})
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
                const target = await Target.find();
                return Response.json({target})
            }
            catch(error){
                return Response.json({error:error})
            }
        }