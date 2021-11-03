import axios, { AxiosInstance } from "axios";
import ResponseData from "@/types/ResponseData";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
	"Content-type": "application/json",
	"Access-Control-Allow-Origin": "*",
  },
});

apiClient.interceptors.response.use(
  (response: ResponseData) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status == 401) {
      localStorage.removeItem("user-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
