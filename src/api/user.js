import axios from "axios";

export const getUsers = async () => {
  return await (
    await axios.get("http://localhost:3333/users")
  ).data;
};
