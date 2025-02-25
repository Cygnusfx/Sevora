// src/SearchContext.js
import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [cachedResults, setCachedResults] = useState({});
  const [cachedQuery, setCachedQuery] = useState("");

  return (
    <SearchContext.Provider
      value={{ cachedResults, setCachedResults, cachedQuery, setCachedQuery }}
    >
      {children}
    </SearchContext.Provider>
  );
}
