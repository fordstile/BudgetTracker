import api from "../api";

// Call backend to register user
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Call backend to login user
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};
