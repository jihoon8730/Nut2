import { useRouter } from "next/router";
import styled from "styled-components";

// Mui Icon
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

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

export default function ListModelbtn(props: { link: string; title: string }) {
  const router = useRouter();

  return (
    <StyleViewBtnSec
      onClick={() => {
        router.push(`/${props.link}`);
      }}
    >
      <ViewButton>
        {props.link === "/list" ? <SearchIcon /> : <AddIcon />}
        &nbsp;{props.title}
      </ViewButton>
    </StyleViewBtnSec>
  );
}
