// api.js
import axios from "axios";

// const API_BASE_URL = "http://52.79.82.218:8000";

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const getProfile = async (profileId) => {
  try {
    const response = await api.get(`/profile/${profileId}`);
    console.log("getProfile called:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeProject = async () => {
  try {
    const response = await api.post("/likes");
    console.log("likeProject called", response);
    return response;
  } catch (error) {
    throw error;
  }
};
