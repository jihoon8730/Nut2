import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

// MUI
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styled from "styled-components";

export default function Navbar() {
  const router = useRouter();

  const { data: session } = useSession();

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
            홈
          </Button>
          <Button
            onClick={() => {
              handleGoPage("/list");
            }}
          >
            모델
          </Button>
          <Button
            onClick={() => {
              handleGoPage("/");
            }}
          >
            스타일
          </Button>
        </Lists>
      </Left>
      <LoginBox>
        {session ? (
          <Profiles>
            <NameTitle>{session?.user?.name}</NameTitle>
            <Avatar
              alt="Profile"
              src={`${session?.user?.image}`}
              sx={{ width: 30, height: 30 }}
            />
          </Profiles>
        ) : (
          ""
        )}

        {session ? (
          <Button
            onClick={() => {
              signOut();
            }}
          >
            로그아웃
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              handleGoPage("/login");
            }}
          >
            로그인
          </Button>
        )}
      </LoginBox>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100vw;
  height: 70px;
  padding: 0px 250px;
  border-bottom: 1px solid #eeeeee;
  background-color: #ffffff;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: -20px;
`;

const Logo = styled.h1``;

const Lists = styled.div`
  display: flex;
  gap: 20px;
`;

const LoginBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Profiles = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NameTitle = styled.p`
  font-size: 14px;
`;
