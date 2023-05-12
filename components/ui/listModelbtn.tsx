import { useRouter } from "next/router";
import styled from "styled-components";

// Mui Icon
import SearchIcon from "@mui/icons-material/Search";

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
  font-size: 20px;
  cursor: pointer;
`;

export default function ListModelbtn() {
  const router = useRouter();

  return (
    <StyleViewBtnSec
      onClick={() => {
        router.push("/list");
      }}
    >
      <ViewButton>
        <SearchIcon />
        모델 스타일 보러가기
      </ViewButton>
    </StyleViewBtnSec>
  );
}
