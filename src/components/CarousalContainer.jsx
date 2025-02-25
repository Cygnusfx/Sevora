import React, { useEffect, useState } from 'react'
import CarousalMain from "./CarousalMain";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMovieStore from '../zustand/store';
import { LinearProgress } from '@mui/material';
function CarousalContainer() {

const {series,loading} = useMovieStore();


    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block",right:" 20px", zIndex:"1" }}
          onClick={onClick}
        />
      );
    }

    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block" ,left:" 20px", zIndex:"1"}}
          onClick={onClick}
        />
      );
    }
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      
      
    };
  return (
    <>
      
      <Slider {...settings} className=" ">
        {series?.shows?.slice(10, 17)

          .map((carousel, index) => (
            <CarousalMain
              key={index}
              title={carousel.title}
              rating={carousel.rating}
              poster={carousel.imageSet?.horizontalPoster.w1080}
              para={carousel.overview}
              id={carousel.imdbId}
            />
          ))}
      </Slider>


     
    </>
  );
}

export default CarousalContainer