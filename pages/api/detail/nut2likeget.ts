import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Nutlikeget(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === "GET") {
    console.log(req.query)
    let _id = req?.query?.id as string;
    let db = (await clientPromise).db('nut2');
    let result = await db.collection('likes').find({parentId: new ObjectId(_id)}).toArray();
    res.status(200).json(result)
  }
}