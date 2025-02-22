import connect from "@/lib/data";
import { NextApiRequest, NextApiResponse } from "next";
import Costumer from "../../../models/customers";
export  async function POST(request: NextApiRequest, Response: NextApiResponse) {
    await connect();
    if(!connect){
        return Response.json({error:"connection failed"})
    }
    try{
        console.log(request.body)

        const costumer = await Costumer.create(request.body);
        return Response.json({costumer})
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
        const costumer = await Costumer.find({});
        return Response.json({costumer})
    }
    catch(error){
        return Response.json({error:error})
    }
}
