import axios from "axios"

const axioInstance = axios.create({
    baseURL: "https://cource-project-jro9.onrender.com/app/",
    timeout: 3000,
  });
  export default axioInstance ;