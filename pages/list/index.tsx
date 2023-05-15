import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";

import clientPromise from "@/lib/mongodb";

import styled from "styled-components";

//Mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface listType {
  userName: string;
  email: string;
  userAge: string;
  snsId: string;
  userId: string;
  fashionShop: { label: string; url: string };
  _id: string;
}

export default function List({
  list,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  console.log(list);

  return (
    <ListContainer>
      <ModelTextFieldBox
        component="form"
        sx={{
          "& > :not(style)": { width: "99%" },
        }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="원하는 모델을 검색해 보세요"
        />
      </ModelTextFieldBox>
      <ModelCardList>
        {list.map(({ userAge, snsId, _id, fashionShop }: listType) => {
          return (
            <ModelCard
              key={_id}
              onClick={() => {
                router.push(`detail/${_id}`);
              }}
            >
              <h4>@ {snsId}</h4>
              <p>{userAge}</p>
              <p>{fashionShop.label}</p>
            </ModelCard>
          );
        })}
      </ModelCardList>
    </ListContainer>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("nut2");

    const list = await db.collection("models").find({}).toArray();

    return {
      props: { list: JSON.parse(JSON.stringify(list)) },
    };
  } catch (e) {
    console.error(e);
  }
}

const ListContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 0px 230px;
`;

const ModelTextFieldBox = styled(Box)`
  margin-top: 20px;
`;

const ModelCardList = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  height: auto;
  margin-top: 20px;
`;

const ModelCard = styled.article`
  width: 24%;
  height: auto;
  padding: 20px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
