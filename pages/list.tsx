import styled from "styled-components";

import clientPromise from "@/lib/mongodb";

//Mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ListContainer = styled.section`
  width: 100%;
  height: 100%;
  padding: 0px 230px;
`;

const ModelTextFieldBox = styled(Box)`
  margin-top: 20px;
`;

interface listType {
  name: string;
  email: string;
  age: string;
  snsId: string;
  userId: string;
  _id: string;
}

export default function List({ list }: any) {
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
      {list.map(({ name, email, age, snsId, userId, _id }: listType) => {
        return (
          <div key={_id}>
            <h4>{name}</h4>
            <p>{email}</p>
            <p>{age}</p>
            <p>{snsId}</p>
            <p>{userId}</p>
          </div>
        );
      })}
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
