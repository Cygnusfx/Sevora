import { create } from "zustand";

const useMovieStore = create((set) => ({
  movies: [], // Movies state
  series: [], // Series state
  search: "", // Search state
  loading: false, // Loading state
  favorites: [], // Favorites state
  setMovies: (data) => set({ movies: data }), // Update movies state
  setSeries: (data) => set({ series: data }), // Update series state
  setSearch: (data) => set({ search: data }), // Update search state
  setLoading: (value) => set({ loading: value }), // Update loading state
  addFavorite: (movie) =>
    set((state) => {
      if (!movie || !movie.id) {
        console.error("Invalid movie data:", movie);
        return state;
      }

      const exists =
        Array.isArray(state.favourites) &&
        state.favourites.some((fav) => fav.id === movie.id);
      if (exists) {
        console.warn("Movie already in favourites:", movie.title);
        return state;
      }

      return { favourites: [...(state.favourites || []), movie] };
    }),

  removeFavorite: (id) =>
    set((state) => ({
      favourites: (state.favourites || []).filter((movie) => movie.id !== id),
    })),
}));


export default useMovieStore;


