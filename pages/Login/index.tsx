import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import SocialBtn from "./component/SocialBtn";

// MUI
import TextField from "@mui/material/TextField";
import Button, { ButtonProps } from "@mui/material/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import styled from "styled-components";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // 로그인 정보 값
  const { data: session } = useSession();
  console.log(session);
  console.log(watch());

  let email = watch("email");
  let password = watch("password");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // 이메일 정규식 유효성 검사 변수 입니다
  const emailPattern = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  // 비밀번호 정규식 유효성 검사 변수 입니다
  const passwordPattern = new RegExp(
    "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$"
  );

  return (
    <Container>
      <SigninContainer>
        <Title>로그인</Title>
        <BodyBox>
          <SocialLoginBox>
            <SocialBtn text={"kakao"} />
            <SocialBtn text={"google"} />
            <SocialBtn text={"github"} />
          </SocialLoginBox>
          <HrBox>
            <Line />
            <Or>or</Or>
            <Line />
          </HrBox>
          <InputBox>
            <TextFields>
              <TextField
                label="이메일"
                variant="outlined"
                placeholder="e.g. example@gmail.com"
                {...register("email", {
                  required: "이메일을 입력해 주세요",
                  pattern: {
                    value: emailPattern,
                    message: "올바른 이메일 형식을 확인해 주세요",
                  },
                })}
              />
              {errors.email?.message ? (
                <Alert severity="error">
                  {errors?.email?.message as string}
                </Alert>
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
            <BootstrapButton
              variant="contained"
              type="submit"
              onClick={() => {
                signIn("email-password-credential", {
                  email,
                  password,
                  callbackUrl: "/",
                });
              }}
            >
              로그인
            </BootstrapButton>
          </InputBox>
        </BodyBox>
      </SigninContainer>
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

const SigninContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 704px;
  padding: 56px 24px;
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

const BodyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 360px;
  height: auto;
  margin-top: 24px;
`;

const SocialLoginBox = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: auto;
`;

const HrBox = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 360px;
  height: 24px;
  gap: 8px;
`;

const Line = styled.hr`
  width: 164.5px;
  border: 1px solid #d6d4d3;
`;

const Or = styled.p`
  color: #848b9d;
  font-size: 16px;
`;

const InputBox = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 360px;
  height: auto;
`;

const TextFields = styled(FormControl)`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BootstrapButton = styled(Button)<ButtonProps>`
  width: 360px;
  height: 56px;
  background-color: #0051f1;

  :hover {
    background-color: #0051f1;
  }
`;
