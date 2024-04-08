import axios from "axios";
export const axiosAuth = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
