import * as streamingAvailability from "streaming-availability";

const API_KEY = "HAHAHAapiHere"; // Replace with your actual API key

const cache = {}; // Store previous responses

const fetchMovieData = async (retryCount = 3) => {
  const cacheKey = "top-shows-prime-us"; // Unique key for caching

  if (cache[cacheKey]) {
    console.log("Returning cached data");
    return cache[cacheKey];
  }

  try {
    const client = new streamingAvailability.Client(
      new streamingAvailability.Configuration({ apiKey: API_KEY })
    );

    const data = await client.showsApi.searchShowsByFilters({
      country: "us",
      catalogs: ["prime"],
      showType: "movie",
      orderBy: "rating",
      
    });

    cache[cacheKey] = data; // Store result in cache
    return data;
  } catch (error) {
    if (error.response?.status === 429 && retryCount > 0) {
      console.warn(
        `Rate limit hit! Retrying in 3 seconds... (${retryCount} attempts left)`
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return fetchMovieData(retryCount - 1);
    } else {
      console.error("Error fetching data:", error);
      return null;
    }
  }
};

export default fetchMovieData;

