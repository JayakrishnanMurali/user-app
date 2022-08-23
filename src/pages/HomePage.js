import { LinearProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "../api/user";
import Filter from "../components/Filter/Filter";
import Pagination from "../components/Pagination/Pagination";
import UserCard from "../components/Usercard/UserCard";
import { updatedStatus } from "../redux/alerts/AlertSlice";
import { updatedFilter } from "../redux/users/UserSlice";
import { notifySuccess } from "../utils/Toast";

let PageSize = 6;

const HomePage = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const filter = useSelector(updatedFilter);
  const alertStatus = useSelector(updatedStatus);

  async function getUsersData(filter) {
    let data = await getUsers(filter);
    setUsers(data);
  }

  useEffect(() => {
    getUsersData(filter);
  }, [filter]);

  useEffect(() => {
    if (alertStatus.status) {
      notifySuccess(alertStatus.msg);
    }
  }, [alertStatus]);

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
      <div className="md:p-16 p-8">
        <Filter />

        <div className="md:my-16 my-8  grid lg:grid-cols-3 grid-cols-1 gap-4 md:gap-0">
          {currentTableData?.map((user) => (
            <Link to={`/update/${user.id}`} key={user.id}>
              <UserCard user={user} />
            </Link>
          ))}
        </div>

        {!currentTableData.length && (
          <h1 className="text-4xl">User Not found!</h1>
        )}

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

        {alertStatus && <ToastContainer />}

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
