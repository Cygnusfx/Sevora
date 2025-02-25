import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function CarousalMain({ title, rating, poster, para ,id}) {
   const navigate = useNavigate();
    const handleClick = () => {
      navigate(`/movie-details/${id}`); // Navigate to details page with movie ID
    };
  const converted = (rating / 10).toFixed(1);
  
  return (
    <div className="w-full sm:h-[40vw] rounded-md bg-amber-600 relative overflow-hidden">
      <div className=" absolute bg-gradient-to-r from-black to-transparent h-full  w-full"></div>
      <img className="w-full h-full object-cover" src={poster} alt={title} />
      <div className=" w-[50vw]  lg:py-4 pl-4 pr-6 lg:pl-10 absolute bottom-4 lg:bottom-8  flex flex-col gap-2 lg:gap-4 ">
        <div className=" text-xl md:text-5xl 2xl:text-8xl tracking-tight">{title}</div>
        <div className="flex gap-2 w-max bg-zinc-800 backdrop-blur-sm py-1 lg:py-2 px-1 lg:px-3 rounded-md text-xs lg:text-sm text-white">
          <div className="flex gap-2">
            <div className="bg-yellow-400 px-1 rounded-xs text-black font-semibold ">
              IMDB
            </div>
            {converted}
          </div>
        </div>
        {/* <p className="text-sm xl:text-md">{para.slice(0,150)}...</p> */}
        <button
          onClick={handleClick}
          className={
            " px-5 lg:px-9 py-2 lg:py-4 bg-white rounded-md w-max text-black text-xl flex items-center justify-center cursor-pointer"
          }
        >
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default CarousalMain;
