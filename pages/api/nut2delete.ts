import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";


export default async function Nutdelete(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body.body)
    try {
      const db = (await clientPromise).db('nut2')
    let result = await db.collection('models').deleteOne({_id : new ObjectId(req.body.body)});
    res.status(200).redirect("/list")
    } catch {
      res.status(401).json("삭제불가")
    }
    
    
  }
}