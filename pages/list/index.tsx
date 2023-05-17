import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from "next";

import clientPromise from "@/lib/mongodb";

import styled from "styled-components";

//Mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface listType {
  userName: string;
  email: string;
  userAge: string;
  snsId: string;
  userId: string;
  fashionShop: { label: string; url: string };
  _id: string;
  avatar: string;
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
        {list.map(({ _id, avatar, snsId }: listType) => {
          return (
            <>
              <Card sx={{ maxWidth: "320px" }}>
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{ bgcolor: red[500] }}
                      aria-label="recipe"
                      src={`${avatar}`}
                    >
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={`@ ${snsId}`}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height=""
                  image="./images/fastion0.jpg"
                  alt="Fashion Images"
                  onClick={() => {
                    router.push(`/detail/${_id}`);
                  }}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </>
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
