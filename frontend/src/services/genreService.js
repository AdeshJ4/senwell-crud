import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/genres";

function genreUrl(id) {
  return `${apiEndpoint}/${id}`;
}

// Get All Genres
export async function getGenres() {
  return await http.get(apiEndpoint);
}

// Get Single Movie
export async function getGenre(genreId) {
  return await http.get(genreUrl(genreId));
}

// Create or Update Genre
export async function saveGenre(genre) {
  // update
  if (genre._id) {
    const body = { ...genre };
    delete body._id;
    return await http.put(genreUrl(genre._id), body);
  }
  // create
  return await http.post(apiEndpoint, genre);
}

// Delete Movie
export async function deleteGenre(genreId) {
  return await http.delete(genreUrl(genreId));
}
