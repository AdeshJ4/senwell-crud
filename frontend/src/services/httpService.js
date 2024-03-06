/*
utility module: 
this file is a utility module that enhances the Axios library for use in a React application. It provides a centralized place for 
handling unexpected errors, logging, and managing authentication tokens
*/

import axios from "axios";
import { toast } from "react-toastify";

/*
Axios Interceptor: 
This code sets up an interceptor for Axios responses. 
Interceptors are functions that Axios runs for every request and response. 
In this case, it's handling responses.
*/
axios.interceptors.response.use(null, (error) => {
  /*
  If there's an error response and it's not in the expected 4xx range (client errors), it logs the error using logger and displays 
  an error toast using toast.
  if server return 500 error then display error message
  */
  //  400, 401, 403
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error(error.message);
    // toast.error("An unexpected error occurred.");
  }

  /*
  Settled Promises:
  Promise.reject(error) ensures that the error continues to propagate so that it can be handled wherever the HTTP request was made.
  You have to handle them using .then.catch()
  */
  return Promise.reject(error);
});

/*
Helper Function:
-> This function sets the 'default header' for 'Axios requests'. 
It's often used to include authentication tokens in headers. 
In this case, it's setting the "x-auth-token" header to the provided JWT (JSON Web Token).
*/
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

/*
Q1]  explain concept "Axios Interceptor" and why we need this?
-> Axios interceptors are functions that Axios allows you to define to 'run your logic' or 'modify the request or response' before the 
request is sent or after the response is received. 
They provide a powerful way to globally handle certain aspects of HTTP requests and responses within your application.
This is beneficial when you want to perform certain actions, such as logging, error handling, or modifying requests globally.
-> You can intercept and modify the request configuration before it is sent. For example, you might want to add headers, 
authentication tokens, or modify the request data.
-> Interceptors are commonly used for 'handling errors' that occur during HTTP requests. 
You can define a response interceptor to catch and handle HTTP errors globally.
-> Interceptors can be used to automatically attach authentication tokens to every outgoing request. For example, you might 
have a token stored in your application, and you can attach it to the headers of every request using an interceptor
-> Interceptors provide a centralized way to configure and manage aspects of your HTTP requests and responses. 
*/
