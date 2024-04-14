import axios from "axios";
export const axiosAuth = axios.create({
  baseURL: "https://s7zuvuun2j.execute-api.us-east-2.amazonaws.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
