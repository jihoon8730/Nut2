import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// 좋아요 기능 POST 클릭 시 추가 및 삭제 API
export default async function Nutlike(req:NextApiRequest, res:NextApiResponse) {
  let session = await getServerSession(req, res, authOptions);
  console.log(session?.user?.email);
  if(req.method === "POST") {
    console.log(req.body)
    let db = (await clientPromise).db('nut2');  
    let result = await db.collection('likes').findOneAndDelete({userId : session?.user?.email});
    res.status(200).json('삭제확인')
  } 
}