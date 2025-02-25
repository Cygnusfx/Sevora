import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TrendingCard from "./TrendingCard";
import useMovieStore from "../zustand/store";

function Series() {
    const { series, loading } = useMovieStore();
  return (
    <div className="bg-[#0b0909] sm:mb-0 mb-16 flex flex-col gap-10 h-screen w-full text-xl p-6 text-white overflow-x-hidden">
      <div className="text-6xl">Trending Tv Shows</div>
      <div className="flex flex-wrap gap-8">
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
      </div>
      <div className="flex gap-10 w-full justify-center">
        <div className="px-4 py-2 bg-amber-500 rounded-md text-black">
          Previous
        </div>
        <div className="px-4 py-2 bg-amber-500 rounded-md text-black">Next</div>
      </div>
    </div>
  );
}

export default Series;
