import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

export default function Comment({ _id }: { _id: string }) {
  const [comment, setComment] = useState([]);

  const router = useRouter();

  const { register, handleSubmit } = useForm({ mode: "onChange" });

  const onSubmit: SubmitHandler<FieldValues> = (commentData) => {
    console.log(commentData.comment);
    axios
      .post("/api/comment/nut2comment", { comment: commentData.comment, _id })
      .then((res) => {
        router.reload();
      })
      .catch((error) => {});
  };

  useEffect(() => {
    axios
      .get(`/api/comment/nut2commentget?id=${_id}`)
      .then((res) => {
        setComment(res?.data);
        console.log(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {comment &&
        comment.map(
          (
            item: { content: string; _id: string; parentId: string },
            index: number
          ) => {
            return <div key={index}>{item.content}</div>;
          }
        )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("comment", { required: true })} />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
