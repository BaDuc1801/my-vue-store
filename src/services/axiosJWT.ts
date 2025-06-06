import axios from "axios";
import userService from "../services/userService";
import { jwtDecode } from "jwt-decode";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const access_token = userService.getAccessToken();
    if (typeof access_token === 'string' && access_token.trim() !== '') {
      const decoded: { exp?: number } = jwtDecode(access_token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        try {
          const data = await userService.refreshAccessToken();
          if (data?.accessToken) {
            localStorage.setItem('access_token', JSON.stringify(data?.accessToken) ?? '');
            config.headers["Authorization"] = `Bearer ${data?.accessToken}`;
          } else {
            window.location.href = '/';
            return Promise.reject(new Error("Token refresh failed"));
          }
        } catch (error) {
          window.location.href = '/';
          return Promise.reject(error);
        }
      } else {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosJWT;
