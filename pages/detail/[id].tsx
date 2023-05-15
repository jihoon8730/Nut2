import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { InferGetServerSidePropsType } from "next";

export default function Detail({
  detail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(detail);

  const { age, email, name, snsId, userId, _id } = detail;
  return (
    <div>
      <p>{age}</p>
      <p>{email}</p>
      <p>{name}</p>
      <p>{snsId}</p>
      <p>{userId}</p>
    </div>
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
