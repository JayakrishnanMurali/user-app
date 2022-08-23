import axios from "axios";

export const getUsers = async (filter) => {
  return await axios.get("http://localhost:3333/users/", {
    params: filter,
  });
};

export const getUser = async (userId) => {
  try {
    return await (
      await axios.get(`http://localhost:3333/users/${userId}/`)
    ).data;
  } catch (e) {
    window.location.replace(window.location.origin + "/error");
  }
};

export const updateUser = async (userId, userData) => {
  await axios.put(`http://localhost:3333/users/${userId}/`, userData);
};

export const createUser = async (userData) => {
  await axios.post(`http://localhost:3333/users/`, userData);
};
