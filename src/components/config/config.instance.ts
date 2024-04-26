import axios from "axios";

const axioInstance = axios.create({
  baseURL: "https://courses-project-iu0w.onrender.com/app/",
  timeout: 10000,
});
export default axioInstance;
