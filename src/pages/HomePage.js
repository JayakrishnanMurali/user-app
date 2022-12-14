import { Alert, LinearProgress, Pagination, Snackbar } from "@mui/material";
import { createBrowserHistory } from "history";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getUsers } from "../api/user";
import Filter from "../components/Filter/Filter";
import UserCard from "../components/Usercard/UserCard";
import { updatedStatus } from "../redux/alerts/AlertSlice";
import { updatedFilter } from "../redux/users/UserSlice";

let PageSize = 6;

const HomePage = () => {
  const [users, setUsers] = useState();
  const [totalUserCount, setTotalUserCount] = useState();
  const [isLoading, setIsloading] = useState(false);
  const filter = useSelector(updatedFilter);
  const alertStatus = useSelector(updatedStatus);
  const [error, setError] = useState(false);
  const [offline, setOflline] = useState(false);
  const history = createBrowserHistory();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState();

  const [currentPage, setCurrentPage] = useState(
    searchParams.get("_page") ?? 1
  );

  let location = useLocation();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    const obj = Object.fromEntries(params);
    setQueryParams(obj);
  }, [location, filter, currentPage]);

  async function getUsersData(filter) {
    try {
      setIsloading(true);
      let res;
      let pageNum = Number(queryParams["_page"]);

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
    if (queryParams) {
      setCurrentPage(Number(queryParams["_page"]));
    }
  }, [queryParams]);

  useEffect(() => {
    if (queryParams) {
      let pageParam = queryParams["_page"];
      let nameParam = queryParams["name_like"];
      let createdAtParam = queryParams["_sort"];
      let orderParam = queryParams["_order"];

      if (!pageParam) {
        setSearchParams({
          _page: pageParam ? Number(pageParam) : 1,
          name_like: nameParam ? nameParam : "",
          _sort: createdAtParam ? createdAtParam : "createdAt",
          _order: orderParam ? orderParam : "desc",
        });
      }

      getUsersData({
        ...filter,
        _page: pageParam ? Number(pageParam) : 1,
        name_like: nameParam ? nameParam : "",
        _sort: createdAtParam ? createdAtParam : "createdAt",
        _order: orderParam ? orderParam : "desc",
      });
    }
  }, [queryParams]);

  const handlePageChange = (event, value) => {
    history.push(`?${new URLSearchParams({ ...filter, _page: value })}`);
    setCurrentPage(value);
  };

  useEffect(() => {
    if (!navigator.onLine) setOflline(true);
    else setOflline(false);
  }, [navigator]);

  if (offline) {
    window.location.replace(window.location.origin + "/error");
    return;
  }

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
            <Link
              to={`/update/${user.id}?_page=${Number(
                queryParams["_page"]
              )}&name_like=${queryParams["name_like"]}&_sort=${
                queryParams["_sort"]
              }&_order=${queryParams["_order"]}`}
              key={user.id}
            >
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
                Number(queryParams["_page"]) ? Number(queryParams["_page"]) : 1
              }
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
};

export default HomePage;
