import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const hash = await bcrypt.hash(req.body.password, 10);
  
    req.body.password = hash;
    let db = (await clientPromise).db('nut2');
    await db.collection('user_create').insertOne(req.body);
    res.status(200).json('성공');
    console.log(req.body)
  }
}