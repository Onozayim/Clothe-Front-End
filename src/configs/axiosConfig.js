import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
});

api.defaults.headers.common["Content-Type"] = "application/json";

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.data.message == "Token expirado") {
      localStorage.removeItem("jwt-token");
      delete api.defaults.headers.common["Authorization"];
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
