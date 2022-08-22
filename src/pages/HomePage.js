import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { getUsers } from "../api/user";
import Filter from "../components/Filter/Filter";
import Pagination from "../components/Pagination/Pagination";
import UserCard from "../components/Usercard/UserCard";
import { Link } from "react-router-dom";

let PageSize = 5; // CHANGE LATER

const HomePage = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  async function getUsersData() {
    let data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    if (!users) getUsersData();
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);

  if (!users)
    return (
      <>
        <LinearProgress />
      </>
    );
  else
    return (
      <div className="p-16 ">
        <Filter />

        <div className="my-16 grid grid-cols-3">
          {currentTableData?.map((user) => (
            <Link to={`/update/${user.id}`} key={user.id}>
              <UserCard user={user} />
            </Link>
          ))}
        </div>
        <div className=" max-w-7xl m-auto flex justify-end mb-12">
          <Link to="/create">
            <button
              className="bg-blue-400 px-2 py-6 text-2xl font-bold 
          rounded-md text-white hover:bg-blue-600 transition-colors duration-300 w-60"
            >
              Create User
            </button>
          </Link>
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={users?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    );
};

export default HomePage;
