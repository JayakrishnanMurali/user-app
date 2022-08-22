import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
