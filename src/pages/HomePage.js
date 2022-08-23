import { Alert, LinearProgress, Pagination, Snackbar } from "@mui/material";
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "../api/user";
import Filter from "../components/Filter/Filter";
import UserCard from "../components/Usercard/UserCard";
import { updatedStatus } from "../redux/alerts/AlertSlice";
import { updatedFilter } from "../redux/users/UserSlice";

let PageSize = 6;

const HomePage = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUserCount, setTotalUserCount] = useState();
  const [isLoading, setIsloading] = useState(false);
  const filter = useSelector(updatedFilter);
  const alertStatus = useSelector(updatedStatus);
  const [error, setError] = useState(false);

  const history = createBrowserHistory();
  const [searchParams, setSearchParams] = useSearchParams();

  async function getUsersData(filter) {
    try {
      setIsloading(true);
      let res;
      console.log(filter, "filt");
      let pageNum = Number(
        new URLSearchParams(window.location.search).get("_page")
      );

      if (pageNum) {
        res = await getUsers({ ...filter, _page: pageNum });
      } else {
        res = await getUsers(filter);
      }
      setTotalUserCount(res.headers["x-total-count"]);
      setUsers(res.data);
    } catch (e) {
      setUsers([]);
      setError(true);
      window.location.replace(window.location.origin + "/error");
    } finally {
      setIsloading(false);
    }
  }
  useEffect(() => {
    getUsersData({
      ...filter,
      _page: new URLSearchParams(window.location.search).get("_page")
        ? Number(new URLSearchParams(window.location.search).get("_page"))
        : 1,
    });
  }, [
    filter,
    currentPage,
    Number(new URLSearchParams(window.location.search).get("_page")),
  ]);

  const handlePageChange = (event, value) => {
    history.push(`?${new URLSearchParams({ _page: value })}`);
    setCurrentPage(value);
  };

  if (isLoading || error)
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
          {users?.map((user) => (
            <Link to={`/update/${user.id}`} key={user.id}>
              <UserCard user={user} />
            </Link>
          ))}
        </div>

        {!users?.length && <h1 className="text-4xl">User Not found!</h1>}

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
        <Snackbar open={alertStatus.status} autoHideDuration={1000}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {alertStatus.msg}
          </Alert>
        </Snackbar>

        {Math.ceil(totalUserCount / PageSize) > 0 && (
          <div className="w-full flex justify-center">
            <Pagination
              count={Math.ceil(totalUserCount / PageSize)}
              page={
                Number(new URLSearchParams(window.location.search).get("_page"))
                  ? Number(
                      new URLSearchParams(window.location.search).get("_page")
                    )
                  : 1
              }
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
};

export default HomePage;
