import Head from "next/head";
import styled from "styled-components";
import { InferGetServerSidePropsType } from "next";

import { useSession } from "next-auth/react";

// Components
import Slick from "@/components/ui/slick";

// react-slick css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import clientPromise from "@/lib/mongodb";
import ListModelbtn from "@/components/ui/listModelbtn";
import Postmodelbtn from "@/components/ui/postModelbtn";

interface postsType {
  _id: string;
  userId: string;
  name: string;
  userAge: string;
  snsId: string;
  email: string;
}
export default function Home({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();
  console.log("session", session);
  console.log(posts);
  return (
    <>
      <Head>
        <title>Nut2</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <div>
          <Slick />
        </div>

        <ModelSection>
          <LinkButtonBox>
            <ListModelbtn />
            <Postmodelbtn />
          </LinkButtonBox>

          <BestStyle>BEST Model</BestStyle>
          <CardBox>
            {posts.map(({ snsId, userAge }: postsType, i: number) => {
              return (
                <LankCard key={i}>
                  <ImageCard src="/images/fastion0.jpg" alt="패션1" />
                  <h4>
                    @ {snsId} / {userAge}
                  </h4>
                </LankCard>
              );
            })}
          </CardBox>
          <BestStyle>Models waiting to be contacted</BestStyle>
        </ModelSection>
      </MainContainer>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("nut2");

    const posts = await db.collection("models").find({}).limit(4).toArray();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },
    };
  } catch (e) {
    console.error(e);
  }
}

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  min-width: 1000px;
`;

const ModelSection = styled.section`
  width: 100vw;
  min-width: 1000px;
  height: auto;
  margin-top: 50px;
  padding: 0px 230px;
`;

const LinkButtonBox = styled.div`
  display: flex;
  gap: 24px;
`;

const BestStyle = styled.h4`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  font-size: ${({ theme }) => theme.fontSize.mainTitle};
`;

const CardBox = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 16px;
`;
const LankCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 25%;
  height: auto;
`;

const ImageCard = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: auto;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  object-fit: cover;
`;
