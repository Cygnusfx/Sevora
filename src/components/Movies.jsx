import React from 'react'
import useMovieStore from "../zustand/store";
import TrendingCard from './TrendingCard';
function Movies() {
    const { movies, setMovies, loading } = useMovieStore();
    // console.log(movies)
  return (
    <div className="bg-[#0b0909] sm:mb-0 mb-16 flex flex-col gap-10 h-screen w-full text-xl p-6 text-white overflow-x-hidden">
      <div className="text-6xl">Trending Movies</div>
      <div className="flex flex-wrap gap-8">
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
      </div>
      <div className='flex gap-10 w-full justify-center'>
        <div className='px-4 py-2 bg-amber-500 rounded-md text-black'>Previous</div>
        <div className='px-4 py-2 bg-amber-500 rounded-md text-black'>Next</div>

      </div>
    </div>
  );
}

export default Movies