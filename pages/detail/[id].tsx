import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { InferGetServerSidePropsType } from "next";
import Comment from "./component/Comment";

export default function Detail({
  detail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(detail);

  const { useAge, author, userName, snsId, fashionShop } = detail;
  return (
    <>
      <div>
        <p>{useAge}</p>
        <p>{author}</p>
        <p>{userName}</p>
        <p>{snsId}</p>
        <p>{fashionShop?.label}</p>
        <Comment />
      </div>
    </>
  );
}

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  try {
    const client = await clientPromise;
    const db = client.db("nut2");

    const detail = await db
      .collection("models")
      .findOne({ _id: new ObjectId(params.id) });
    return {
      props: { detail: JSON.parse(JSON.stringify(detail)) },
    };
  } catch (e) {
    console.error(e);
  }
}
