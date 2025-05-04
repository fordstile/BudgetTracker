// // //import { axios } from "axios"; // Named import from axios
// // import axios from "axios";
// // //import * as axios from "axios";
// // const axiosInstance = axios.default.create({
// //   baseURL: "http://localhost:5000", // Your backend URL
// //   withCredentials: true, // Send cookies with requests
// // });

// // export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api", // Make sure /api prefix is included if your backend routes use it
//   withCredentials: true, // Optional: only if you’re using cookies
// });

// // 🔐 Add Authorization header if token exists
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // Or however you're storing it
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
// await axiosInstance.delete("/accounts/mobile");

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // base path to match your backend's /api prefix
  withCredentials: true, // 🔐 ensures cookies like your JWT are sent with requests
});

export default axiosInstance;
