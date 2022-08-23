import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import UpdateUserPage from "./pages/UpdateUser";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/update/:id" element={<UpdateUserPage />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
