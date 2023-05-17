import { useForm } from "react-hook-form";

import { useSession } from "next-auth/react";

// MUI
import TextField from "@mui/material/TextField";
import Button, { ButtonProps } from "@mui/material/Button";

import styled from "styled-components";
import SocialBtn from "./component/SocialBtn";

export default function Login() {
  const { register, watch } = useForm();

  // 로그인 정보 값
  const { data: session, status } = useSession();
  console.log(session);

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
            <TextField
              label="Email"
              variant="outlined"
              placeholder="e.g. example@gmail.com"
              {...register("email")}
            />
            <TextField type="password" label="Password" variant="outlined" />
            <BootstrapButton variant="contained" type="submit">
              Login
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
  height: 744px;
  margin: 50px auto;
`;

const SigninContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 552px;
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
  height: 408px;
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
  gap: 24px;
  width: 360px;
  height: 216px;
`;

const BootstrapButton = styled(Button)<ButtonProps>`
  width: 360px;
  height: 56px;
  background-color: #0051f1;

  :hover {
    background-color: #0051f1;
  }
`;
