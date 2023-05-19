import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function Nutcomment(req:NextApiRequest, res:NextApiResponse) {
  let session = await getServerSession(req, res, authOptions);
  console.log(session?.user?.email)
  if (req.method === "POST") {
    console.log(req.body)
    let commentData = {
      content :  req.body.comment,
      parentId : new ObjectId(req.body._id),
      author : session?.user?.email,
    }
    let db = (await clientPromise).db('nut2');
    let result = await db.collection('comment').insertOne(commentData);
    res.status(200).json('저장 확인')
  }
}