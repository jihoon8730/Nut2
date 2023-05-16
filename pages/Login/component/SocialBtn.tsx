import { signIn } from "next-auth/react";

import styled from "styled-components";

export default function SocialBtn(props: { text: string }) {
  return (
    <ButtonSocial
      onClick={() => {
        signIn(`${props.text}`, { callbackUrl: "/login" });
      }}
    >
      {props.text.toUpperCase()}
    </ButtonSocial>
  );
}

const ButtonSocial = styled.button`
  width: 100%;
  height: 50px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 16px;
  color: #686868;
`;
