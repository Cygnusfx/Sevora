import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Search from "./components/Search";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Favourites from "./components/Favourites";
import MovieDetails from "./components/MovieDetails";
import { SearchProvider } from "./SearchContext";
import PlayGround from "./components/PlayGround";

function App() {
  return (
    <>
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/movie-details/:id" element={<MovieDetails />} />
              <Route path="/play-ground/:infoHash" element={<PlayGround />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </>
  );
}

export default App;
