import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OThkODk0MTM1YmI1ZGZhNGJmNmQ4ZTZmZTYwMDZlYiIsInN1YiI6IjY2MWQwZGY0OTMxZWExMDE4NjY1OWRiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bYX3EP4HVg_6seb3xwj88wr5L_3ki2YIJVqhVAPNmKU";

async function fetchMovies(path) {
  try {
    const response = await axios.get(path);
    return response.data;
  } catch (error) {
    alert("Error fetching movies");
  }
}

export default fetchMovies;
