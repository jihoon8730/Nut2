import clientPromise from "../../lib/mongodb";
import type { NextApiResponse, NextApiRequest } from "next";

export default async function Movies(req:NextApiRequest, res:NextApiResponse) {
try {
    const client = await clientPromise;
    const db = client.db("nut2");

    const nut2Post = await db
        .collection("models")
        .find({})
        .toArray();
    res.json(nut2Post);
} catch (e) {
    console.error(e);
}
};