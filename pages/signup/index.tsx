import { useState } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import styled from "styled-components";

// Mui
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

export default function Signup() {
  // 비밀번호 보이기 / 숨기기 토글 State 입니다
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  // useForm react-hook-form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  console.log(watch());

  // 비밀번호 숨기기 or 보이기 토글 함수 입니다
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCheck = () =>
    setShowPasswordCheck((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // 전송 시 전송 데이터 Submit 함수 입니다
  const onSubmit: SubmitHandler<FieldValues> = (inputData) => {
    console.log(inputData);
    // 회원가입 진행 시 서버로 전송되는 데이터 입니다
    let signupData = {
      name: inputData.name,
      email: inputData.email,
      password: inputData.password,
    };
    axios
      .post("/api/auth/signup", signupData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 전송 시 에러 데이터 반환 error 함수 입니다
  const onError: SubmitErrorHandler<FieldValues> = (error) => {
    console.log(error);
  };

  // 이메일 정규식 유효성 검사 변수 입니다
  const emailPattern = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  // 비밀번호 정규식 유효성 검사 변수 입니다
  const passwordPattern = new RegExp(
    "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$"
  );

  return (
    <Container>
      <SignupContainer>
        <Title>회원가입</Title>
        <InputBox onSubmit={handleSubmit(onSubmit, onError)}>
          <TextFields>
            <TextField
              label="이름"
              variant="outlined"
              placeholder="이름을 입력해 주세요"
              {...register("name", {
                required: "이름을 입력해 주세요",
              })}
            />
            {errors.name?.message ? (
              <Alert severity="error">{errors?.name?.message as string}</Alert>
            ) : null}
          </TextFields>
          <TextFields>
            <TextField
              label="이메일"
              variant="outlined"
              placeholder="EX) qwer1234@gmail.com"
              {...register("email", {
                required: "이메일을 입력해 주세요",
                pattern: {
                  value: emailPattern,
                  message: "올바른 이메일 형식을 확인해 주세요",
                },
              })}
            />
            {errors.email?.message ? (
              <Alert severity="error">{errors?.email?.message as string}</Alert>
            ) : null}
          </TextFields>
          <TextFields>
            <InputLabel htmlFor="outlined-adornment-password">
              비밀번호
            </InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="비밀번호"
              placeholder="EX) 영문, 숫자, 특수기호 조합 8자리 이상"
              {...register("password", {
                required: "비밀번호를 입력해 주세요",
                pattern: {
                  value: passwordPattern,
                  message: "영문, 숫자, 특수기호 조합 8자리를 확인해 주세요",
                },
              })}
            />

            {errors.password?.message && (
              <Alert severity="error">
                {errors?.password?.message as string}
              </Alert>
            )}
          </TextFields>
          <TextFields>
            <InputLabel htmlFor="outlined-adornment-password">
              비밀번호 확인
            </InputLabel>
            <OutlinedInput
              type={showPasswordCheck ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPasswordCheck}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPasswordCheck ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("passwordCheck", {
                required: "비밀번호 확인을 입력해 주세요",
              })}
              label="비밀번호 확인"
            />
            <Alert severity="error">비밀번호가 같은지 확인해 주세요</Alert>
          </TextFields>
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
  height: auto;
  margin: 50px auto;
`;

const SignupContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  padding: 120px 0px;
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
  height: auto;
`;

const TextFields = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
