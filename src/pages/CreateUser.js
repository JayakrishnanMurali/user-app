import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/user";
import { updateStatus } from "../redux/alerts/AlertSlice";

const CreateUserPage = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [url, setUrl] = useState("");
  const [isPublic, setIsPublic] = useState("");

  const [nameError, setNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (event) => {
    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        if (
          !event.target.value
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        break;
      case "age":
        setAge(event.target.value);
        if (event.target.value <= 0) {
          setAgeError(true);
        } else {
          setAgeError(false);
        }
        break;
      case "url":
        setUrl(event.target.value);
        break;
      case "status":
        setStatus(event.target.value);
        if (!event.target.value.match(/^[a-zA-Z]+$/)) {
          setStatusError(true);
        } else {
          setStatusError(false);
        }
        break;
      case "userName":
        setName(event.target.value);
        if (!event.target.value.match(/^[a-zA-Z]+$/)) {
          setNameError(true);
        } else {
          setNameError(false);
        }
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
      dispatch(updateStatus({ status: true, msg: "Successfully created" }));
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  const handleCreate = () => {
    if (!name || !status || !email || !age || !url)
      return alert("Please fill every field before submitting");

    if (nameError || emailError || statusError || ageError)
      return alert("Please correct the errors before submitting");

    const userData = {
      age: age,
      avatarUrl: url,
      name: name,
      statusMessage: status,
      isPublic: isPublic,
      email: email,
      createdAt: new Date().toISOString(),
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
            error={nameError}
            helperText={nameError && "Must only be alphabets"}
            onChange={handleChange}
            className="w-full"
          />
          <TextField
            id="status"
            label="Status Message"
            variant="outlined"
            error={statusError}
            helperText={statusError && "Must only be alphabets"}
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
            error={emailError}
            helperText={emailError && "Must be a valid email address"}
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
            error={ageError}
            helperText={ageError && "Must be a positive number"}
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
