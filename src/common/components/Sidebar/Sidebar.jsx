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
// import candyLogo from "../../assets/images/candy_logo.jpg";

const NAVIGATION = [
  // {
  //   kind: "header",
  //   title: "Продукты",
  // },

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

  const [session, setSession] = useState({
    user: {
      name: "Укиев Айдин",
      email: "sweetkurut@gmail.com",
      image:
        "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
    },
  });
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Укиев Айдин",
            email: "sweetkurut@gmail.com",
            image:
              "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
          },
        });
      },
      signOut: () => {
        setSession(null);
        navigate("/login");
      },
    };
  }, [navigate]);

  const handleNavigation = (segment, parentSegment) => {
    if (segment === "logout") {
      authentication.signOut();
    } else if (segment === "profile") {
      authentication.goToProfile();
    } else if (segment === "settings") {
      authentication.goToSettings();
    } else {
      if (parentSegment) {
        navigate(`/${parentSegment}/${segment}`);
      } else {
        navigate(`/${segment}`);
      }
    }
  };

  const handleLogoClick = () => {
    navigate("/catalog");
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: "Baytik-недвижимость",
        fontFamily: "Montserrat",
        // logo: (
        //   <img
        //     src={candyLogo}
        //     alt="Candy Logo"
        //     style={{
        //       cursor: "pointer",
        //       color: "white",
        //       borderRadius: "50%",
        //       background: "#000",
        //       objectFit: "cover",
        //     }}
        //     onClick={handleLogoClick}
        //   />
        // ),
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      session={session}
      authentication={authentication}
      sx={{
        fontFamily: "Montserrat",
      }}
    >
      <DashboardLayout onNavigation={handleNavigation}>
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
