// api.js
import axios from "axios";

const API_BASE_URL = "http://52.79.82.218:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const saveProfile = async (profileData, op) => {
  try {
    console.log("profileData: ", profileData);
    if (op === "post") {
      const response = await api.post("/profile", profileData);
      console.log("saveProfile(post) called:", response.data);
      return response.data;
    } else {
      const response = await api.put("/profile", profileData);
      console.log("saveProfile(put) called:", response.data);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchProfile = async () => {
  try {
    const response = await api.get("/profile");
    console.log("fetchProfile called", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (profileId) => {
  try {
    const response = await api.get(`/profile/${profileId}`);
    console.log("getProfile called:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeProject = async (projectId) => {
  console.log(
    "api/likeProject called:, projectId: (",
    typeof projectId,
    ") ",
    projectId
  );
  try {
    const response = await api.post(`/likes/${projectId}`);
    console.log("likeProject called", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await api.post("/profile/image", formData, {});
    console.log("uploadProfileImage called:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
