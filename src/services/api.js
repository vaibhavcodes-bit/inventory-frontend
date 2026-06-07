import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-backend-z1ks.onrender.com",
});

export default api;