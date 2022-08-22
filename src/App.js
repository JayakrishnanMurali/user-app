import { useEffect, useMemo, useState } from "react";
import { getUsers } from "./api/user";
import Filter from "./components/Filter/Filter";
import Pagination from "./components/Pagination/Pagination";
import UserCard from "./components/Usercard/UserCard";

let PageSize = 5; // CHANGE LATER

function App() {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  async function getUserData() {
    let data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    if (!users) getUserData();
  }, []);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);

  if (!users) return <>Loading..</>;
  else
    return (
      <div className="p-16 ">
        <Filter />

        <div className="my-16 grid grid-cols-3">
          {currentTableData?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={users?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />

        {/* Create User Button */}
      </div>
    );
}

export default App;
