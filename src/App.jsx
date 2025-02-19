import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/login";
import RealEstatePage from "./pages/realEstate";
import SalesPage from "./pages/sales";
import UsersPage from "./pages/users";
import ProfilePage from "./pages/profile";
import Layout from "./common/layout/Layout";
import AboutPage from "./pages/about";
import ProtectedRoute from "./common/components/ProtectedRoute";
import RealEstateDetailPage from "./pages/realEstateDetail";
import DetailUserPage from "./pages/detailUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          {/* <Route element={ProtectedRoute}> */}
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/real-estate" element={<RealEstatePage />} />
          <Route path="/real-estate/:id" element={<RealEstateDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<DetailUserPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about-company" element={<AboutPage />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
