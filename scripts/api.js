console.log("config==>", config);
const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;

async function getPopularMovies(page = 1) {
  // HERE WE NEED TO USE API: "movie/popular"
  // Refer the link below to get insight on how to use this API
  // And also what response in return you get from that API
  //   https://developers.themoviedb.org/3/movies/get-popular-movies
  let data = [];
  try {
    const response = await fetch(
      `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const responseData = await response.json();
    data = responseData?.results;
    console.log("data==>", data);
    const imageUrl = getImageUrl(data[0].poster_path);
    console.log("imageUrl==>", imageUrl);
  } catch (error) {
    console.log("error==>", error);
  }
  return data;
}

