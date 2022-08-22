import { useEffect, useState } from "react";
import { getUsers } from "./api/user";
import Filter from "./components/Filter/Filter";
import UserCard from "./components/Usercard/UserCard";

function App() {
  const [users, setUsers] = useState();

  async function getUserData() {
    let data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    if (!users) getUserData();
  }, []);

  return (
    <div className="p-16 ">
      <Filter />

      <div className="my-16 grid grid-cols-3">
        {users.map((user) => (
          <UserCard user={user} />
        ))}
      </div>

      {/* Pagination COmponent */}

      {/* Create User Button */}
    </div>
  );
}

export default App;
