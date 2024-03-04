import axios from "axios";

const axioInstance = axios.create({
  baseURL: "http://localhost:3000/app/",
  timeout: 3000,
});
export default axioInstance;
