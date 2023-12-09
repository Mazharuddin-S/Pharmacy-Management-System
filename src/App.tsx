import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/home";
import SearchMedicine from "./Components/searchMed";
import RemoveMedicine from "./Components/removeMedicine";
import AddMedicine from "./Components/addMedicine";
import Dashboard from "./Components/dashboard";
import Expiring from "./Components/expiring";
import OutOfStock from "./Components/outOfStock";
import ErrorPage from "./Components/erroPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={"Users"} element={<Home />}>
          <Route path="" element={<SearchMedicine />} />
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="expiring" element={<Expiring />} />
          <Route path="out-of-stock" element={<OutOfStock />} />
          <Route path="removeMedicine" element={<RemoveMedicine />} />
          <Route path="addMedicine" element={<AddMedicine />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
