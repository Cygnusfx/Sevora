import React from "react";
import CarousalContainer from "./CarousalContainer";
import TrendingMoviesContainer from "./TrendingMoviesContainer";
import TrendingSeriesContainer from "./TrendingSeriesContainer";

function Home() {
  return (
    <div className="bg-[#0b0909] mb-16 sm:mb-0 flex flex-col gap-10 h-screen w-full p-6 text-white overflow-x-hidden">
      <CarousalContainer />
      <TrendingMoviesContainer />
      <TrendingSeriesContainer />
    </div>
  );
}

export default Home;
