import { InferGetServerSidePropsType } from "next";

import clientPromise from "@/lib/mongodb";

import ListCard from "./component/listitem";

import styled from "styled-components";

//Mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function List({
  lists,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(lists);

  return (
    <ListContainer>
      <ModelTextFieldBox
        component="form"
        sx={{
          "& > :not(style)": { width: "99%" },
        }}
      >
        <ModelTextField
          id="outlined-basic"
          variant="outlined"
          label="원하는 모델을 검색해 보세요"
        />
      </ModelTextFieldBox>
      <ModelCardList>
        <ListCard lists={lists} />
      </ModelCardList>
    </ListContainer>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("nut2");

    const lists = await db.collection("models").find({}).toArray();

    return {
      props: { lists: JSON.parse(JSON.stringify(lists)) },
    };
  } catch (e) {
    console.error(e);
  }
}

const ListContainer = styled.section`
  height: auto;
  padding: 0px 230px;
`;

const ModelTextFieldBox = styled(Box)`
  margin-top: 20px;
`;

const ModelTextField = styled(TextField)``;

const ModelCardList = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100vw;
  height: auto;
  margin-top: 20px;
`;
