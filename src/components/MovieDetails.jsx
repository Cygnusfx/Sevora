import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import * as streamingAvailability from "streaming-availability";
import { FaPlus, FaCheck } from "react-icons/fa6"; // FaCheck for "added" icon
import { LinearProgress } from "@mui/material";
import useMovieStore from "../zustand/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { favourites, addFavorite, removeFavorite } = useMovieStore(); // ✅ Added removeFavorite
  const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

  const API_KEY = "HAHAHAapiHere"; // Replace with your actual API key

  // Fetch movie details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const client = new streamingAvailability.Client(
          new streamingAvailability.Configuration({
            apiKey: API_KEY,
          })
        );

        const data = await client.showsApi.getShow({
          country: "us",
          id: id,
        });

        setMovie(data); // Store movie details
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  //handle torrent links requests
  // const searchMovies = async (query) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5001/search?q=${encodeURIComponent(query)}`
  //     );
  //     setMovies(response.data); // Ensure response.data is an array
  //   } catch (error) {
  //     console.error("Error fetching movie torrents:", error);
  //   }
  // };

  const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds

  const searchMovies = async (query) => {
    const cacheKey = `movies_${query}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);

      // Check if cached data is still valid
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        console.log("Using cached data for:", query);
        setMovies(data);
        return;
      }
    }

    // If no cache or expired, fetch from API
    try {
      const response = await axios.get(
        `http://localhost:5001/search?q=${encodeURIComponent(query)}`
      );

      if (Array.isArray(response.data)) {
        setMovies(response.data);

        // Store data in localStorage with timestamp
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: response.data, timestamp: Date.now() })
        );
      }
    } catch (error) {
      console.error("Error fetching movie torrents:", error);
    }
  };

// console.log(movie);

  const extractInfoHash = (magnetLink) => {
    if (!magnetLink) return null;
    const match = magnetLink.match(/xt=urn:btih:([a-fA-F0-9]+)/);
    return match ? match[1] : null;
  };

  // Handle Navigation to the Stream Page
  const handleNavigation = (magnetValue) => {
    const extractedHash = extractInfoHash(magnetValue);
    
    if (extractedHash) {
      navigate(`/play-ground/${extractedHash}`);
    } else {
      console.error("Invalid magnet link: No InfoHash found");
    }
  };

  // ✅ Log `favourites` only when it changes
  //   useEffect(() => {
  //     console.log("Favourites updated:", favourites);
  //   }, [favourites]);

  // ✅ Memoize `isFavourite` to prevent unnecessary recalculations
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
  // console.log(movies);
  const handlePlay = () => {
    // console.log(movie.title);
    searchMovies(movie.title);
  };

  if (loading)
    return (
      <div className="bg-[#0b0909] w-full h-screen text-center text-white">
        <LinearProgress
          className="fixed top-0 left-0 w-full "
          color="inherit"
        />
      </div>
    );
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-[#0b0909] mb-16 sm:mb-0 flex flex-col gap-4 w-full p-6 text-white overflow-x-hidden">
      <div className="w-full lg:h-[40vw] relative bg-zinc-700 rounded-md overflow-hidden">
        <div className="w-full h-[20vh] xl:h-[50vh] absolute bottom-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent "></div>

        <img
          className="w-full h-full object-cover"
          src={
            movie.imageSet?.horizontalPoster?.w1440 ||
            movie.imageSet?.HorizontalBackdrop?.w1080
          }
          alt={movie.title}
        />
      </div>
        <div className=" flex flex-col md:px-8 gap-2 xl:gap-4">
          <div className="text-4xl md:text-6xl lg:text-8xl">{movie.title}</div>
          <div className="flex flex-col-reverse xl:flex-row gap-2">
            <div className="flex gap-2 lg:gap-3 bg-[#222222] px-2 lg:px-3 py-1 text-md rounded-md w-max">
              {movie?.genres?.length > 0 ? (
                movie.genres.map((genre, index) => (
                  <div key={index}>{genre.id.toUpperCase()}</div>
                ))
              ) : (
                <p>No genres available</p>
              )}
            </div>
            <div className="flex gap-2 items-center font-semibold text-md">
              <div className="bg-yellow-400 px-1 rounded-xs text-black font-semibold flex items-center">
                IMDB
              </div>
              {(movie.rating / 10).toFixed(1)}
            </div>
          </div>
          <div className="flex gap-3 lg:gap-6 ">
            <button
              onClick={() => searchMovies(movie.title)}
              className=" px-3 xl:px-5 lg:px-9 py-2 sm:text-sm  md:text-lg  lg:py-4 bg-gradient-to-br from-[#8832ff] to-[#ff3292] rounded-md w-max text-white font-semibold xl:text-xl flex items-center justify-center cursor-pointer"
            >
              Stream Now
            </button>
            <button
              onClick={handleFavoriteClick} // ✅ Toggle favorite
              className="flex items-center justify-center bg-[#393939] px-6 rounded-md hover:bg-[#484848] cursor-pointer"
            >
              {isFavourite ? (
                <FaCheck className="text-xl text-green-500" />
              ) : (
                <FaPlus className="text-xl" />
              )}
            </button>
          </div>
        </div>
      <div className="h-[2px] bg-zinc-700 w-full mt-8"></div>
      <div className="flex flex-col gap-10 text-white py-6 xl:p-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl xl:text-5xl font-semibold">STORYLINE</h1>
          <p className="text-sm xl:text-lg lg:w-1/2">
            {movie.overview || "No description available."}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-10 xl:gap-30 text-lg font-semibold">
            <div className="w-34">Release Year</div>
            <div className="font-normal">{movie.releaseYear || "N/A"}</div>
          </div>
          <div className="flex items-center gap-10 xl:gap-30 text-lg font-semibold">
            <div className="w-34">Duration</div>
            <div className="font-normal">{movie.runtime || "N/A"} min</div>
          </div>
          <div className="flex items-center gap-10 xl:gap-30 text-lg font-semibold">
            <div className="w-34">SeasonsCount</div>
            <div className="font-normal">{movie?.seasonCount || "N/A"} </div>
          </div>
          <div className="flex items-center gap-10 xl:gap-30 text-lg font-semibold">
            <div className="w-34">EpisodesCount</div>
            <div className="font-normal">{movie?.episodeCount || "N/A"} </div>
          </div>
          <div className="flex items-center gap-10 xl:gap-30 text-lg font-semibold">
            <div className="w-34">Creators</div>
            <div className="font-normal">{movie?.creators|| "N/A"} </div>
          </div>
          <div className="flex items-start gap-10 xl:gap-30 text-lg font-semibold">
            <div className="w-34">Cast</div>
            <div className="flex flex-col gap-1 font-normal">
              {movie.cast?.map((cast, index) => (
                <div key={index}>{cast || "N/A"} </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col  gap-2 px-2 py-2 mt-4 bg-[#3b3b3b] rounded-md">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div
                key={index}
                className="flex bg-[#1f1f1f] px-3 py-1 flex-col  rounded-md"
              >
                <div className=" text-xs md:text-sm font-bold">
                  {movie.title || "Unknown Title"}
                </div>
                {movie.magnet ? (
                  <button
                    onClick={() => handleNavigation(movie.magnet)}
                    className="text-sm text-blue-300 font-semibold cursor-pointer w-max"
                  >
                    Stream Now
                  </button>
                ) : (
                  <p className="text-sm text-red-400">
                    No magnet link available
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
