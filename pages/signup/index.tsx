import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

// Mui
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import styled from "styled-components";

export default function Signup() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  console.log(watch());
  console.log(errors);

  const onSubmit: SubmitHandler<FieldValues> = (inputData) => {
    console.log(inputData);
  };

  const onError: SubmitErrorHandler<FieldValues> = (error) => {
    console.log(error);
  };

  return (
    <Container>
      <SignupContainer>
        <Title>회원가입</Title>
        <InputBox onSubmit={handleSubmit(onSubmit, onError)}>
          <TextField
            label="이메일"
            variant="outlined"
            {...register("email", { required: "이메일을 입력해 주세요" })}
          />
          <TextField label="비밀번호" variant="outlined" />
          <TextField label="비밀번호 확인" variant="outlined" />
          <Button type="submit" variant="contained">
            회원가입
          </Button>
        </InputBox>
      </SignupContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 552px;
  height: 744px;
  margin: 50px auto;
`;

const SignupContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 704px;
  border: 1px solid #dfdfdf;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 360px;
  height: 64px;
  padding-bottom: 16px;
  font-size: 32px;
  font-weight: 700;
  color: #121212;
`;

const InputBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 360px;
  height: 216px;
`;
