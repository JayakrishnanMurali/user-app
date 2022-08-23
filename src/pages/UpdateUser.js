import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../api/user";
import { updateStatus } from "../redux/alerts/AlertSlice";

const UpdateUserPage = () => {
  const [currentUser, setCurrentUser] = useState();
  const [updatedName, setUpdatedName] = useState();
  const [updatedStatus, setUpdatedStatus] = useState();
  const [updatedEmail, setUpdatedEmail] = useState();
  const [updatedAge, setUpdatedAge] = useState();
  const [updatedUrl, setUpdatedUrl] = useState();
  const [updatedIsPublic, setUpdatedIsPublic] = useState();

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function getUserData(userId) {
    let data = await getUser(userId);
    setCurrentUser(data);
  }

  useEffect(() => {
    if (!currentUser) getUserData(params.id);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUpdatedAge(currentUser.age);
      setUpdatedName(currentUser.name);
      setUpdatedStatus(currentUser.statusMessage);
      setUpdatedEmail(currentUser.email);
      setUpdatedUrl(currentUser.avatarUrl);
      setUpdatedIsPublic(currentUser.isPublic);
    }
  }, [currentUser]);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "email":
        setUpdatedEmail(event.target.value);
        break;
      case "age":
        setUpdatedAge(event.target.value);
        break;
      case "url":
        setUpdatedUrl(event.target.value);
        break;
      case "status":
        setUpdatedStatus(event.target.value);
        break;
      case "userName":
        setUpdatedName(event.target.value);
        break;
      default:
        setUpdatedIsPublic(event.target.value);
        break;
    }
  };

  async function updateUserDetails(userId, userData) {
    try {
      await updateUser(userId, userData);
      navigate("/");
      dispatch(updateStatus({ status: true, msg: "Successfully Updated" }));
    } catch (error) {
      alert("Something went wrong!");
    }
  }

  const handleUpdate = () => {
    if (
      !updatedAge ||
      !updatedUrl ||
      !updatedName ||
      !updatedStatus ||
      !updatedEmail
    )
      return alert("Please fill every field before submitting");

    const userData = {
      age: updatedAge,
      avatarUrl: updatedUrl,
      name: updatedName,
      statusMessage: updatedStatus,
      isPublic: updatedIsPublic,
      email: updatedEmail,
      createdAt: currentUser.createdAt,
    };

    if (userData) updateUserDetails(params.id, userData);
  };

  if (!currentUser)
    return (
      <>
        <LinearProgress />
      </>
    );
  else
    return (
      <div className="md:p-16 px-4 py-8">
        <h1 className="text-6xl font-bold">User Details</h1>
        <div className="mt-16 max-w-7xl m-auto  flex md:flex-row flex-col items-center  gap-8 shadow-md border md:p-16 p-4">
          <img
            src={currentUser.avatarUrl}
            className="lg:w-80 lg:h-80 w-52 h-52 md:ml-20 object-cover"
          />
          <div>
            <TextField
              id="userName"
              label="User Name"
              variant="outlined"
              value={updatedName}
              onChange={handleChange}
              className="w-full"
            />
            <TextField
              id="status"
              label="Status Message"
              variant="outlined"
              value={updatedStatus}
              onChange={handleChange}
              className="w-full"
              sx={{ marginTop: 3, marginBottom: 3 }}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={updatedEmail}
              onChange={handleChange}
              className="w-full"
              sx={{ marginBottom: 3 }}
            />
            <TextField
              id="age"
              label="Age"
              type="number"
              value={updatedAge}
              variant="outlined"
              onChange={handleChange}
              className="w-full"
              sx={{ marginBottom: 3 }}
            />

            <FormControl className="w-full" sx={{ marginBottom: 3 }}>
              <InputLabel>Is Public</InputLabel>
              <Select
                id="isPublic"
                value={updatedIsPublic ?? false}
                label="order"
                onChange={handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="url"
              label="Avatar URL"
              value={updatedUrl}
              variant="outlined"
              onChange={handleChange}
              className="w-full"
              sx={{ marginBottom: 3 }}
            />
          </div>
        </div>
        <div className=" flex justify-end mt-8 max-w-7xl m-auto">
          <button
            onClick={handleUpdate}
            className="bg-blue-400 py-6 text-2xl font-bold 
          rounded-md text-white hover:bg-blue-600 transition-colors duration-300 w-60"
          >
            Update User
          </button>
        </div>
      </div>
    );
};

export default UpdateUserPage;
