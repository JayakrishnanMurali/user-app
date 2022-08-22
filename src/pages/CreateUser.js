import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUser, updateUser } from "../api/user";

const CreateUserPage = () => {
  const [name, setName] = useState();
  const [status, setStatus] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [url, setUrl] = useState();
  const [isPublic, setIsPublic] = useState();

  const navigate = useNavigate();

  const handleChange = (event) => {
    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        break;
      case "age":
        setAge(event.target.value);
        break;
      case "url":
        setUrl(event.target.value);
        break;
      case "status":
        setStatus(event.target.value);
        break;
      case "userName":
        setName(event.target.value);
        break;
      default:
        setIsPublic(event.target.value);
        break;
    }
  };

  async function createUserDetails(userData) {
    try {
      await createUser(userData);
      navigate("/");
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  const handleCreate = () => {
    if (!name || !status || !email || !age || !url)
      return alert("Please fill every field before submitting");

    const userData = {
      age: age,
      avatarUrl: url,
      name: name,
      statusMessage: status,
      isPublic: isPublic,
      email: email,
      createdAt: moment.now(),
    };

    if (userData) createUserDetails(userData);
  };

  return (
    <div className="md:p-16 px-4 py-8">
      <h1 className="text-6xl font-bold">Create User</h1>
      <div className="mt-16 max-w-7xl m-auto  flex md:flex-row flex-col items-center  gap-8 shadow-md border md:p-16 p-4">
        <img
          src="https://mhcid.washington.edu/wp-content/uploads/2021/12/placeholder-user-scaled.jpg"
          className="w-80 h-80 md:ml-20 object-cover"
        />
        <div>
          <TextField
            id="userName"
            label="User Name"
            variant="outlined"
            value={name}
            onChange={handleChange}
            className="w-full"
          />
          <TextField
            id="status"
            label="Status Message"
            variant="outlined"
            value={status}
            onChange={handleChange}
            sx={{ marginTop: 3, marginBottom: 3 }}
            className="w-full"
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleChange}
            className="w-full"
            sx={{ marginBottom: 3 }}
          />
          <TextField
            id="age"
            label="Age"
            type="number"
            value={age}
            variant="outlined"
            onChange={handleChange}
            className="w-full"
            sx={{ marginBottom: 3 }}
          />

          <FormControl className="w-full" sx={{ marginBottom: 3 }}>
            <InputLabel>Is Public</InputLabel>
            <Select
              id="isPublic"
              value={isPublic ?? false}
              label="order"
              onChange={handleChange}
            >
              <MenuItem value={true}>YES</MenuItem>
              <MenuItem value={false}>NO</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="url"
            label="Avatar URL"
            value={url}
            variant="outlined"
            onChange={handleChange}
            className="w-full"
            sx={{ marginBottom: 3 }}
          />
        </div>
      </div>
      <div className=" flex justify-end mt-8 max-w-7xl m-auto">
        <button
          onClick={handleCreate}
          className="bg-blue-400 py-6 text-2xl font-bold 
          rounded-md text-white hover:bg-blue-600 transition-colors duration-300 w-60"
        >
          Create User
        </button>
      </div>
    </div>
  );
};

export default CreateUserPage;
