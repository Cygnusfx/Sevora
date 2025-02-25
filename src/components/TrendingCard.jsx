import React, { useMemo, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useMovieStore from "../zustand/store";

function TrendingCard({ title, poster, rating, className, id }) {
  const { favourites, addFavorite, removeFavorite } = useMovieStore(); // ✅ Added removeFavorite
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);


  

  const handleClick = () => {
    navigate(`/movie-details/${id}`); // Navigate to details page with movie ID
  };
  const converted = (rating / 10).toFixed(1);
  const isFavourite = useMemo(() => {
    return (favourites || []).some((fav) => fav.id === movie?.id);
  }, [favourites, movie]);

  // ✅ Toggle favorite (Add if not present, Remove if present)
  const handleFavoriteClick = () => {
    if (movie && movie.id) {
      if (isFavourite) {
        removeFavorite(movie.id); // Remove if already in favorites
      } else {
        addFavorite(movie); // Add if not in favorites
      }
    } else {
      console.error("Movie data is invalid:", movie);
    }
  };

  return (
    <div
      className={` w-38 h-68 sm:w-54 sm:h-96  hover:scale-105 transition-transform transform hover:z-10 ${className} cursor-pointer`}
    >
      <div onClick={handleClick} className="h-3/4 ">
        <img className="h-full w-full object-cover" src={poster} alt={title} />
      </div>
      <div className="h-1/4 flex justify-between items-center py-3">
        <div className="flex flex-col gap-2 justify-between">
          <div className="text-white text-sm font-medium">{title}</div>
          <div className="text-white flex gap-2">
            <div className="text-white text-sm flex gap-2">
              <div className="bg-yellow-400 px-1 rounded-xs text-black font-semibold">
                IMDB
              </div>{" "}
              {converted}
            </div>
          </div>
        </div>
        {/* <button
          onClick={handleFavoriteClick} // ✅ Toggle favorite
          className="flex items-center justify-center bg-[#393939] ml-2 px-4 py-3 rounded-md hover:bg-[#484848] cursor-pointer"
        >
          {isFavourite ? (
            <FaCheck className="text-xl text-green-500" />
          ) : (
            <FaPlus className="text-xl" />
          )}
        </button> */}
      </div>
    </div>
  );
}

export default TrendingCard;
