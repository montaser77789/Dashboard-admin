import axios from "axios";

const axioInstance = axios.create({
  baseURL: "https://courses-project-iu0w.onrender.com/app/",
});
export default axioInstance;
