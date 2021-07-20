import axios from "axios";
export const TMDB_API = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
  // searchQuery: `/search/multi?api_key=${TMDB_KEY}&language=en-US&page=1&include_adult=false`,
  // fetchGenres: `/genre/movie/list?api_key=${TMDB_KEY}&language=en-US`,
  fetchPopularMovies: `/movie/popular?api_key=${TMDB_KEY}&language=en-US`,
  fetchTopRatedMovies: `/movie/top_rated?api_key=${TMDB_KEY}&language=en-US`,
  fetchTrendingMovies: `/trending/movie/week?api_key=${TMDB_KEY}`,
  // fetchTrendingTV: `/trending/tv/week?api_key=${TMDB_KEY}`,
};
export const fetchMovieId = (id) => {
  return `/movie/${id}?api_key=${TMDB_KEY}&append_to_response=videos`;
};

export default requests;
