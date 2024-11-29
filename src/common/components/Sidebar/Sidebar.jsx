import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import candyLogo from "../../assets/img/logo.jpg";

const NAVIGATION = [
  {
    segment: "real-estate",
    title: "Недвижимость",
    icon: <HomeOutlinedIcon />,
  },
  {
    segment: "sales",
    title: "Продажи",
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    segment: "users",
    title: "Пользователи",
    icon: <GroupOutlinedIcon />,
  },
  {
    segment: "profile",
    title: "Профиль",
    icon: <AccountCircleOutlinedIcon />,
  },
  {
    segment: "about-company",
    title: "О нас",
    icon: <InfoOutlinedIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    // fontSize: "10px",
  },

  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 820,
      md: 820,
      lg: 1200,
      xl: 1536,
    },
  },
});

function Sidebar({ children, window }) {
  const navigate = useNavigate();
  const location = useLocation();

  const router = useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(path),
    };
  }, [location, navigate]);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: "Дежурка",
        fontFamily: "Montserrat",
        logo: (
          <img
            src={candyLogo}
            alt="Baytik Logo"
            style={{
              cursor: "pointer",
              color: "white",
              borderRadius: "50%",
              background: "#000",
              objectFit: "cover",
            }}
          />
        ),
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      sx={{
        fontFamily: "Montserrat",
      }}
    >
      <DashboardLayout>
        <Box sx={{ width: "96%", height: "100%", fontFamily: "Montserrat" }}>
          {children}
          <Outlet />
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node,
  window: PropTypes.func,
};

export default Sidebar;
