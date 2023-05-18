import axios from "axios";
import { useRouter } from "next/router";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

interface listType {
  userName: string;
  email: string;
  userAge: string;
  snsId: string;
  _id: string;
  avatar: string;
  fashionShop: { label: string; url: string };
}

export default function Listitem({ lists }: any) {
  console.log(lists);
  const router = useRouter();

  return (
    <>
      {lists.map(({ _id, avatar, snsId }: listType, index: number) => {
        return (
          <>
            <Card sx={{ maxWidth: "320px" }} key={index}>
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
                  <IconButton>
                    <DeleteIcon
                      onClick={() => {
                        const isDelete =
                          window.confirm("정말 삭제 하시겠습니까?");
                        if (isDelete) {
                          axios
                            .post("/api/nut2delete", { body: _id })
                            .then((res) => {
                              console.log(res);
                              router.reload();
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }
                      }}
                    />
                  </IconButton>
                }
                title={`@ ${snsId}`}
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="350px"
                image="./images/fastion0.jpg"
                alt="Fashion Images"
                onClick={() => {
                  router.push(`/detail/${_id}`);
                }}
                style={{ cursor: "pointer" }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
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
    </>
  );
}
