import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function Nutpost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session = await getServerSession(req, res, authOptions);
  if (session) {
    req.body.author = session.user?.email;
    req.body.avatar = session.user?.image;
    req.body.date = new Date();
  }
  try {
    const client = await clientPromise;
    const db = client.db("nut2");
    const nut2Post = await db.collection("models").insertOne(req.body);
    res.redirect(302, "/list");
  } catch {
    console.log("전송실패");
  }

}
