const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;

async function getPopularMovies(page = 1) {
// HERE WE NEED TO USE API: "movie/popular"
// Refer the link below to get insight on how to use this API
// And also what response in return you get from that
// https://developers.themoviedb.org/3/movies/get-popular-movies
}




async function getMovieDetail (movieId) {
  const url = `${BASE_URL}movie/{${movieId}}?api_key=${API_KEY}&language=en-US`
}