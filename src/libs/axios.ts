import axios from "axios";
export const axiosAuth = axios.create({
  // baseURL: "https://4x3sn0wkaf.execute-api.us-east-2.amazonaws.com/api/",
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
    
  },
});
