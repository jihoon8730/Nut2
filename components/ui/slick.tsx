import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

export default function Slick() {
  // slick 세팅
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "200px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        <ImageBox>
          <Images src="/images/slick01.jpg" alt="Nut메인 이미지" />
        </ImageBox>
        <ImageBox>
          <Images src="/images/slick02.jpg" alt="Nut메인 이미지" />
        </ImageBox>
        <ImageBox>
          <Images src="/images/slick02.jpg" alt="Nut메인 이미지" />
        </ImageBox>
      </Slider>
    </div>
  );
}

const ImageBox = styled.section`
  padding: 30px;
`;

const Images = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;
