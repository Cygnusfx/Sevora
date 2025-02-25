import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import useMovieStore from "../zustand/store";
import fetchMovieData from "../api/movieApi";
import TrendingCard from "./TrendingCard";

function TrendingMovies() {
  const { movies, setMovies, loading } = useMovieStore();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMovieData(); // Wait for the API call to finish
      // const movies = response.shows.filter((item) => item.showType === "movie");
      // console.log(response)
      setMovies(response);
    };

    fetchData(); // Call the async function
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: " -10px", zIndex: "1" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: " -30px", zIndex: "1" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
    adaptiveHeight: true,
  };
  return (
    <>
      <div className="w-full flex flex-col gap-6 ">
        <div className="ml-9 text-2xl font-semibold">Top Rated Movies</div>
        {/* <div className=" "> */}
        <Slider {...settings} className=" ml-5  ">
          {movies?.shows?.slice(0, 20).map((movie, index) => (
            <TrendingCard
              key={index}
              title={movie.title}
              poster={movie.imageSet?.verticalPoster.w720}
              rating={movie.rating || "N/A"}
              className={"mt-4 ml-4 mr-4"}
              id={movie.imdbId}
            />
          ))}
        </Slider>
        {/* </div> */}
      </div>
    </>
  );
}

export default TrendingMovies;
