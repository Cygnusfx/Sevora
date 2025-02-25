import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../SearchContext"; // Import context
import { debounce } from "lodash";
import { LinearProgress } from "@mui/material";
import { RiSearch2Line } from "react-icons/ri";
import * as streamingAvailability from "streaming-availability";
import TrendingCard from "./TrendingCard";

function Search() {
  const { cachedResults, setCachedResults, cachedQuery, setCachedQuery } =
    useContext(SearchContext);
  const [value, setValue] = useState(cachedQuery || ""); // Restore previous query
  const [results, setResults] = useState(cachedResults[cachedQuery] || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "HaHAHAHAapiHere"; // Replace with your actual API key

  useEffect(() => {
    if (cachedQuery && cachedResults[cachedQuery]) {
      setResults(cachedResults[cachedQuery]); // Use cached results if available
    }
  }, [cachedQuery, cachedResults]);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = debounce(async () => {
    if (!value.trim()) return;

    setLoading(true);
    setResults(null);
    setError("");

    if (cachedResults[value]) {
      setResults(cachedResults[value]); // Use cached data
      setLoading(false);
      return;
    }

    try {
      const client = new streamingAvailability.Client(
        new streamingAvailability.Configuration({ apiKey: API_KEY })
      );

      const data = await client.showsApi.searchShowsByTitle({
        country: "us",

        title: value,
        orderBy: "rating",
      });

      setResults(data);
      setCachedResults((prev) => ({ ...prev, [value]: data })); // Cache results
      setCachedQuery(value);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <div className="w-full h-full">
      {loading && (
        <LinearProgress
          className="fixed top-0 left-0 w-full "
          color="inherit"
        />
      )}

      <div className="bg-[#0b0909] flex mb-16 sm:mb-0 flex-col gap-5 h-screen w-full p-10 text-white overflow-x-hidden">
        <div className="w-full flex ">
          <button
            onClick={handleSearch}
            className="text-lg bg-[#0b2670] flex items-center justify-center px-8 hover:bg-[#0f2f87] cursor-pointer"
          >
            <RiSearch2Line className="text-2xl" />
          </button>
          <input
            onChange={handleInput}
            value={value}
            type="text"
            placeholder="Search your favourite show..."
            className="px-6 py-6 outline-none text-lg bg-[#181818] w-full"
          />
        </div>

        {error && <div className="text-xl text-red-500">{error}</div>}

        {results && !loading && (
          <div className="text-xl text-zinc-500 font-regular">
            Results for {value}
          </div>
        )}

        <div className="flex flex-wrap gap-8">
          {results?.slice(0, 20).map((movie, index) => (
            <TrendingCard
              key={index}
              title={movie.title}
              poster={movie.imageSet?.verticalPoster.w720}
              rating={movie.rating || "N/A"}
              id={movie.imdbId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
