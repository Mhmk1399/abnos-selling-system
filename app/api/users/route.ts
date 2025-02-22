import connect from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/users";
export  async function POST(request: NextApiRequest, Response: NextApiResponse) {
    await connect();
    if(!connect){
        return Response.json({error:"connection failed"})
    }
    try{
        console.log(request.body)

        const user = await User.create(request.body);
        return Response.json({user})
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
        const user = await User.find();
        return Response.json({user})
    }
    catch(error){
        return Response.json({error:error})
    }
}