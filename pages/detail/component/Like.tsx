import React, { useEffect, useState } from "react";

// Mui
import ToggleButton from "@mui/material/ToggleButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import axios from "axios";

// 좋아요 클릭 컴포넌트 부분 입니다
export default function Like({ _id }: { _id: string }) {
  const [selected, setSelected] = useState<boolean>(true);
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`/api/detail/nut2likeget?id=${_id}`)
      .then((res) => {
        console.log(res);
        setLikeCount(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
          console.log(selected);
        }}
        sx={{ color: pink[500] }}
        onClick={() => {
          axios
            .post("/api/detail/nut2like", {
              parentId: _id,
              selected: selected,
            })
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        <FavoriteIcon sx={{ fontSize: 40 }} />
      </ToggleButton>
      <button
        onClick={() => {
          axios
            .post("/api/detail/nut2likedelete")
            .then((res) => {})
            .catch((error) => {});
        }}
      >
        좋아요 삭제
      </button>
      <div>{likeCount}</div>
    </>
  );
}
