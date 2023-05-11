import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const StyledSlider = styled(Slider)``;

const ImageBox = styled.section`
  padding: 30px;
`;

const Images = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 6px;
`;

export default function Slick() {
  // slick 세팅
  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "200px",
    speed: 500,
    // autoplay: true,
    autoplayspeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div>
      <StyledSlider {...settings}>
        <ImageBox>
          <Images src="/images/slick01.jpg" alt="Nut메인 이미지" />
        </ImageBox>
        <ImageBox>
          <Images src="/images/slick02.jpg" alt="Nut메인 이미지" />
        </ImageBox>
        <ImageBox>
          <Images src="/images/slick03.jpg" alt="Nut메인 이미지" />
        </ImageBox>
      </StyledSlider>
    </div>
  );
}
