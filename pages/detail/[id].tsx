import { useEffect, useState } from "react";
import { InferGetServerSidePropsType } from "next";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

import Comment from "./component/Comment";
import Like from "./component/Like";
import styled from "styled-components";

export default function Detail({
  detail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { useAge, author, userName, snsId, fashionShop, _id } = detail;

  return (
    <>
      <DetailContainer>
        <Testdiv>
          <TestdivImage src="/images/fastion0.jpg" alt="image_loding" />
        </Testdiv>
        <Testdiv>
          <SnsTitle>@ {snsId}</SnsTitle>
          <p>{useAge}</p>
          <p>{author}</p>
          <p>{userName}</p>
          <Like _id={_id} />
          <p>자주 이용하는 쇼핑몰</p>
          <p>{fashionShop?.label}</p>
        </Testdiv>
      </DetailContainer>
      <div>
        <Comment _id={_id} />
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

const DetailContainer = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: #ffffff;
`;

const Testdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: auto;
  background-color: #ffffff;
`;

const TestdivImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const SnsTitle = styled.p`
  font-size: 60px;
  font-weight: 700;
`;
