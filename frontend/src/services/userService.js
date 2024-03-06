import http from "./httpService";
import { apiUrl } from "../config/config.json";

const apiEndpoint = apiUrl + "/users";

export async function getUser(userId) {
  return await http.get(`${apiEndpoint}/${userId}`);
}

export async function registerUser(user) {
  console.log(user);
  if (user._id) {
    const body = { ...user };
    delete body._id; // delete _id property
    return await http.put(`${apiEndpoint}/${user._id}`, body);
  } else {
    return await http.post(apiUrl + "/users/register", {
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNo: user.mobileNo,
      country: user.country,
      email: user.email,
      password: user.password,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
    });
  }
}

// export async function updateUser(userId, updatedUserData, config) {
export async function updateUser(userId, updatedUserData) {
  console.log("updatedUserData:", updatedUserData);
  return await http.put(`${apiEndpoint}/${userId}`, updatedUserData);
  // return await http.put(`${apiEndpoint}/${userId}`, updatedUserData, config);
}

export async function deleteUser(userId) {
  return await http.delete(`${apiEndpoint}/${userId}`);
}
