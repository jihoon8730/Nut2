import Link from "next/link";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterInfoBox>
        <Title>Nut2</Title>
        <GoLinks>
          <GoLink href="https://github.com/jihoon8730">Github</GoLink>
          <GoLink href="https://github.com/jihoon8730">Email</GoLink>
          <GoLink href="https://rec8730.tistory.com/">Blog</GoLink>
          <GoLink href="https://www.instagram.com/0112mm_nin/">SNS</GoLink>
        </GoLinks>
      </FooterInfoBox>
      <Description>제작자 : Shin ji hoon</Description>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  min-width: 1000px;
  height: 200px;
  padding: 32px 230px;
  margin-top: 100px;
  background-color: #252525;
  border-top: 1px solid #eeeeee;
  background-color: #ffffff;
`;

const FooterInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  border-bottom: 1px solid #eeeeee;
  padding: 20px 0px;
`;

const Title = styled.h4`
  font-size: 32px;
`;

const GoLinks = styled.div`
  display: flex;
  gap: 20%;
  width: 100%;
`;

const GoLink = styled(Link)`
  color: gray;
`;

const Description = styled.h4`
  margin-top: 16px;
  font-size: 14px;
`;
