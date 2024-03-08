import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/movies";

export async function getMovies(currentPage) {
  return await http.get(`${apiEndpoint}?pageNumber=${currentPage}`);
}

export const getMoviesBySearchQuery = async (query, pageNumber) => {
  return await http.get(
    `${apiEndpoint}/search/${query}?pageNumber=${pageNumber}`
  );
};

export async function getMoviesByGenre(genre, pageNumber) {
  return await http.get(
    `${apiEndpoint}/genre/${genre.name}?pageNumber=${pageNumber}`
  );
}

export async function getMovie(movieId) {
  return await http.get(`${apiEndpoint}/${movieId}`);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id; // delete _id property
    return await http.put(`${apiEndpoint}/${movie._id}`, body);
  } else {
    return await http.post(apiEndpoint, movie);
  }
}

export async function deleteMovie(movieId) {
  return await http.delete(`${apiEndpoint}/${movieId}`);
}
