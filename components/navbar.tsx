import { useRouter } from "next/router";

// MUI
import Button from "@mui/material/Button";

import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100vw;
  height: 70px;
  padding: 0px 30px;
  border-bottom: 1px solid #eeeeee;
  background-color: #ffffff;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Logo = styled.h1``;

const Lists = styled.div`
  display: flex;
  gap: 20px;
`;

const LoginBox = styled.div``;

export default function Navbar() {
  const router = useRouter();

  const handleGoPage = (pages: string) => {
    router.push(pages);
  };
  return (
    <NavbarContainer>
      <Left>
        <Logo>Nut2</Logo>
        <Lists>
          <Button
            onClick={() => {
              handleGoPage("/");
            }}
          >
            Home
          </Button>
          <Button
            onClick={() => {
              handleGoPage("/");
            }}
          >
            Style
          </Button>
        </Lists>
      </Left>
      <LoginBox>
        <Button
          variant="contained"
          onClick={() => {
            handleGoPage("/login");
          }}
        >
          Login
        </Button>
      </LoginBox>
    </NavbarContainer>
  );
}
