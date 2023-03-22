import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  // timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
});
export default axiosInstance;
