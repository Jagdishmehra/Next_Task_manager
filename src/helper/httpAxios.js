import axios from "axios";

// createing an instance of axios for its reusability
export const httpInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});
