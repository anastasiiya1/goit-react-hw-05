import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OThkODk0MTM1YmI1ZGZhNGJmNmQ4ZTZmZTYwMDZlYiIsInN1YiI6IjY2MWQwZGY0OTMxZWExMDE4NjY1OWRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYX3EP4HVg_6seb3xwj88wr5L_3ki2YIJVqhVAPNmKU";
axios.defaults.params = {
  per_page: 20,
};

export async function fetchTrendingMovies() {
  try {
    const { data } = await axios.get("/trending/movie/day");
    return data.results;
  } catch (error) {
    alert("Error fetching movies");
  }
}

export async function fetchMoviesByQuery(query, page) {
  try {
    const response = await axios.get("/search/movie", {
      params: {
        query,
        page,
      },
    });
    return response;
  } catch (error) {
    alert("Error fetching movies");
  }
}

export async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get("/movie", {
      params: {
        movieId,
      },
    });
    return response;
  } catch (error) {
    alert("Error fetching movies");
  }
}


export async function fetchMovieCast(movieId){
  try {
    const response = await axios.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.log("Error fetching cast");
    return [];
  }
}


export async function fetchMovieReviews(movieId){
  try {
    const response = await axios.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.log("Error fetching reviews");
    return [];
  }
}