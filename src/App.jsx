import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/login";
import RealEstatePage from "./pages/realEstate";
import SalesPage from "./pages/sales";
import UsersPage from "./pages/users";
import ProfilePage from "./pages/profile";
import Layout from "./common/layout/Layout";
import AboutPage from "./pages/about";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/real-estate" element={<RealEstatePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about-company" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
