import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

const Filter = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-6xl font-bold">Users</h1>

      <div className="flex">
        <div>
          <TextField label="User Name" variant="outlined" />
        </div>

        <div className="mx-4">
          <FormControl className="w-36">
            <InputLabel>Sort By</InputLabel>
            <Select
              //   value={age}
              label="Sort By"
              //   onChange={handleChange}
            >
              <MenuItem value="age">Age</MenuItem>
              <MenuItem value="createdAt">CreatedAt</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl className="w-36">
            <InputLabel>Order</InputLabel>
            <Select
              value="asc"
              label="order"
              //   onChange={handleChange}
            >
              <MenuItem value="asc">Asc</MenuItem>
              <MenuItem value="desc">Desc</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default Filter;
