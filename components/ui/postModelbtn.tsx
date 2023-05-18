import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

// Mui Icon
import AddIcon from "@mui/icons-material/Add";

import styled from "styled-components";

export default function Postmodelbtn() {
  const router = useRouter();

  const { data: session } = useSession();
  console.log(session);

  const handlePostLink = () => {
    if (session) {
      router.push("/post");
    } else {
      alert("로그인이 필요한 서비스 입니다");
      router.push("/login");
    }
  };
  return (
    <StyleViewBtnSec onClick={handlePostLink}>
      <ViewButton>
        <AddIcon />
        &nbsp; 모델 등록하기
      </ViewButton>
    </StyleViewBtnSec>
  );
}

const StyleViewBtnSec = styled.article`
  margin-bottom: 20px;
  width: 100%;
`;

const ViewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #1363df;
  border: 0px;
  height: 70px;
  border-radius: 50px;
  color: #eeeeee;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;

  :hover {
    background-color: #154dbd;
  }
`;
