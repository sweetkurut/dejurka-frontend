import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/login";
import RealEstatePage from "./pages/realEstate";
import SalesPage from "./pages/sales";
import UsersPage from "./pages/users";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SalesPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/real-estate" element={<RealEstatePage/>} />
        <Route path="/users" element={<UsersPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
