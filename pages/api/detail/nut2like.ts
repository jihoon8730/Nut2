import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

// 좋아요 기능 POST 클릭 시 추가 및 삭제 API
export default async function Nutlike(req:NextApiRequest, res:NextApiResponse) {
  let session = await getServerSession(req, res, authOptions);
  console.log(req.body)
  try {
    if(req.method === "POST") {
      let likeData = {
        userId : session?.user?.email,
        parentId : new ObjectId(req.body.parentId),
        selected: req.body.selected,
      }
  
      let db = (await clientPromise).db('nut2');  
      let isLike = db.collection('likes').findOne({userId: session?.user?.email});
      if (await isLike) {
        return res.status(400).json('좋아요를 누른 게시물 입니다')
      }
      let result = await db.collection('likes').insertOne(likeData);
      res.status(200).json('저장 확인')
      
    }
  } catch {
    return res.status(500).json("네트워크 전송 실패");
  }
   
}