import React, { useEffect, useState } from "react";
import TrendingCard from "./TrendingCard";
import Slider from "react-slick";
import useMovieStore from "../zustand/store";
import fetchSeriesData from "../api/seriesApi";
import { LinearProgress } from "@mui/material";

function TrendingSeriesContainer() {
  const { series, setSeries, loading, setLoading } = useMovieStore();
  // const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data

      try {
        const response = await fetchSeriesData();
         // Wait for the API call to finish
        // const data = await response.json();
        // const series = response.shows.filter(
        //   (item) => item.showType === "series"
        // );
        // console.log(response)
        setSeries(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
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
      <div className="w-full relative flex flex-col gap-6">
        {/* <div className=" mr-10 "> */}

        <div className="ml-9 text-2xl font-semibold">Top Rated Series</div>

        <Slider {...settings} className=" ml-5 ">
          {series?.shows?.slice(0, 20).map((series, index) => (
            <TrendingCard
              key={index}
              title={series.title}
              poster={series.imageSet?.verticalPoster.w720}
              rating={series.rating || "N/A"}
              className={"mt-4 ml-4 mr-4"}
              id={series.imdbId}
            />
          ))}
          {/* </div> */}
        </Slider>
      </div>
    </>
  );
}

export default TrendingSeriesContainer;
