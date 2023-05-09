import clientPromise from "../../lib/mongodb";
import type { NextApiResponse, NextApiRequest } from "next";
import { ObjectId } from "mongodb";

export default async function Movies(req:NextApiRequest, res:NextApiResponse) {
  try {
      const client = await clientPromise;
      const db = client.db("sample_mflix");

      const movies = await db
          .collection("movies")
          .find({"_id": new ObjectId("573a1394f29313caabcdf67a")})
          .sort({ metacritic: -1 })
          .limit(10)
          .toArray();
      res.json(movies);
  } catch (e) {
      console.error(e);
  }
};