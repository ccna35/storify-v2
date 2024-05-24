// Create an instance using the config defaults provided by the library

import axios from "axios";

// At this point the timeout config value is `0` as is the default for the library
export const query = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out

// instance.defaults.timeout = 2500;
