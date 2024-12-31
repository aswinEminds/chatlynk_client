import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:7878",
  headers: {
    "Content-Type": "application/json",
  },
});

const secureInstance = axios.create({
  baseURL: "http://localhost:7878",
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

secureInstance.interceptors.request.use(
  (config) => {
    const Token = localStorage.getItem("Token");
    if (!Token) {
      window.location.href = "/login";
    } else {
      config.headers["authorization"] = `Bearer ${Token}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

secureInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalrequest = error.config;
    if (error.response.status === 403 && !originalrequest._retry) {
      originalrequest._retry = true;
      const refreshtoken = localStorage.getItem("RefreshToken");
      if (refreshtoken) {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/refresh/refresh",
            {
              token: refreshtoken,
            }
          );
          console.log(response.data.token);
          localStorage.setItem("Token", response.data.token);
          originalrequest.headers[
            "authorization"
          ] = `Bearer ${response.data.token}`;
          return secureInstance(originalrequest);
        } catch (err) {
          localStorage.removeItem("RefreshToken");
          localStorage.removeItem("Token");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, secureInstance };
