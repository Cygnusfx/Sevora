import React from 'react'
import useMovieStore from '../zustand/store';
import TrendingCard from './TrendingCard';
function Favourites() {
  const { favourites } = useMovieStore();
  // console.log(favourites);
  return (
    <>
      <div className="bg-[#0b0909] mb-16 sm:mb-0 flex flex-col gap-10 h-screen w-full text-6xl p-8 text-white overflow-x-hidden">
        <h1 className="text-5xl">Favourites</h1>
        <div className="flex flex-wrap gap-6">
          {favourites?.slice(0, 20).map((series, index) => (
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
      </div>
    </>
  );
}

export default Favourites