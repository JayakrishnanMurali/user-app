import axios from "axios";

export const getUsers = async (filter) => {
  return await (
    await axios.get("http://localhost:3333/users/", { params: filter })
  ).data;
};

export const getUser = async (userId) => {
  return await (
    await axios.get(`http://localhost:3333/users/${userId}/`)
  ).data;
};

export const updateUser = async (userId, userData) => {
  await axios.put(`http://localhost:3333/users/${userId}/`, userData);
};

export const createUser = async (userData) => {
  await axios.post(`http://localhost:3333/users/`, userData);
};
