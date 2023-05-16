import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function Nutpost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("nut2");
    const nut2Post = await db.collection("models").insertOne(req.body);
    res.redirect(200, "/list");
  } catch {
    console.log("전송실패");
  }
}
