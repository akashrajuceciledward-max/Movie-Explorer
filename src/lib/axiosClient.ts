import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://www.omdbapi.com/",
  timeout: 8000,
});
