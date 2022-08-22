import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UpdateUserPage from "./pages/UpdateUser";
import CreateUser from "./pages/CreateUser";

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
