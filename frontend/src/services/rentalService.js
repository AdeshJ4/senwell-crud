import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/rentals";

function rentalUrl(id) {
  return `${apiEndpoint}/${id}`;
}
export async function getRental(rentalId) {
  return await http.get(rentalUrl(rentalId));
}

function rentalPage(page) {
  return `${apiEndpoint}?pageNumber=${page}`;
}

export async function getRentals(currentPage) {
  return await http.get(rentalPage(currentPage));
}

// Create rental
export async function saveRental(rental) {
  return await http.post(apiEndpoint, rental);
}
