import axios from "axios";

const axioInstance = axios.create({
  baseURL: "http://localhost:3000/app/",
});
export default axioInstance;
