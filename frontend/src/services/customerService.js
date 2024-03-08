import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/customers";

export async function getCustomer(customerId) {
  return await http.get(`${apiEndpoint}/${customerId}`);
}

export async function getCustomers(currentPage) {
  return await http.get(`${apiEndpoint}?pageNumber=${currentPage}`);
}

export async function getCustomersByMemberships(membership, pageNumber) {
  return await http.get(
    `${apiEndpoint}/membership/${membership.name}?pageNumber=${pageNumber}`
  );
}

export const getCustomersBySearchQuery = async (query, pageNumber) => {
  return await http.get(
    `${apiEndpoint}/search/${query}?pageNumber=${pageNumber}`
  );
};

export async function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return await http.put(`${apiEndpoint}/${customer._id}`, body);
  } else {
    return await http.post(apiEndpoint, customer);
  }
}

export async function deleteCustomer(customerId) {
  return await http.delete(`${apiEndpoint}/${customerId}`);
}
