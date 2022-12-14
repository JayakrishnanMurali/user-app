import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateFilter } from "../../redux/users/UserSlice";

const Filter = () => {
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [orderBy, setOrderBy] = useState("desc");

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = () => {
    setSearchParams({
      name_like: name,
      _sort: sortBy,
      _order: orderBy,
      _page: 1,
      _limit: 6,
    });
    dispatch(
      updateFilter({
        name_like: name,
        _sort: sortBy,
        _order: orderBy,
        _page: 1,
        _limit: 6,
      })
    );
  };

  useEffect(() => {
    setName(searchParams.get("name_like") ? searchParams.get("name_like") : "");
    setSortBy(
      searchParams.get("_sort") ? searchParams.get("_sort") : "createdAt"
    );
    setOrderBy(
      searchParams.get("_order") ? searchParams.get("_order") : "desc"
    );
  }, [
    searchParams.get("_order"),
    searchParams.get("name_like"),
    searchParams.get("_sort"),
  ]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="flex md:flex-row flex-col justify-between items-center">
      <h1 className="text-6xl font-bold md:mb-0 mb-12">Users</h1>

      <div className="flex md:flex-row flex-col">
        <div className="md:mb-0 mb-4">
          <TextField
            value={name}
            onChange={handleNameChange}
            label="User Name"
            variant="outlined"
          />
        </div>

        <div className="md:mx-4 md:mb-0 mb-4">
          <FormControl className="md:w-36 w-56">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
              <MenuItem value="age">Age</MenuItem>
              <MenuItem value="createdAt">CreatedAt</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="md:mr-4 md:mb-0 mb-4">
          <FormControl className="md:w-36 w-56">
            <InputLabel>Order</InputLabel>
            <Select
              value={orderBy}
              label="order"
              onChange={handleOrderByChange}
            >
              <MenuItem value="asc">Asc</MenuItem>
              <MenuItem value="desc">Desc</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <button
            onClick={handleFilterChange}
            className="bg-gray-400 px-8 py-4 rounded-md hover:bg-gray-600 text-white transition-colors duration-300"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
