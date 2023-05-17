import GoogleIcon from "/public/images/Google_G_Logo.svg";
import GithubIcon from "/public/images/Github_G_Logo.svg";
import KakaoIcon from "/public/images/KakaoTalk_K_Logo.svg";
import { signIn } from "next-auth/react";

import styled from "styled-components";

export default function SocialBtn(props: { text: string }) {
  return (
    <ButtonSocial
      onClick={() => {
        signIn(`${props.text}`, { callbackUrl: "/" });
      }}
    >
      <Icons>
        {props.text === "google" ? (
          <GoogleIcon />
        ) : props.text === "github" ? (
          <GithubIcon />
        ) : props.text === "kakao" ? (
          <KakaoIcon />
        ) : (
          ""
        )}
      </Icons>
      <Title>{props.text}</Title>
    </ButtonSocial>
  );
}

const ButtonSocial = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 50px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 16px;

  color: #686868;
`;

const Icons = styled.span`
  display: flex;

  align-items: center;
  width: 30px;
`;

const Title = styled.span`
  width: 70px;
  text-align: start;
`;
