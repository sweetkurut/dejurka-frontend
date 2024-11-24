import { useEffect, useRef, useState } from "react";
import {
  TextField,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

import styles from "./login.module.scss";
import { useAuthUserMutation } from "../../../../store/services/AuthApi";

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  const navigate = useNavigate();
  const [authUser, { isLoading, error }] = useAuthUserMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setSnackbarMessage("Заполните поля");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const data = await authUser(formData).unwrap();
      const token = data.access_token;
      localStorage.setItem("accessToken", token);
      setSnackbarMessage("Успешно вошли!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      if (data.access_token) {
        navigate("/sales");
      }
    } catch (err) {
      const errorMessage =
        err?.data?.message || "Ошибка входа. Проверьте данные.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.banner} ref={vantaRef}>
        <Container component="main" maxWidth="md" className={styles.container}>
          <form className={styles.form} onSubmit={formSubmit}>
            <h2 className={styles.title}>Авторизация</h2>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Логин"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите логин"
              className={styles.input}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9px",
                  marginBottom: "10px",
                  border: "1px solid #fff",
                  color: "#fff",
                  "& input": {
                    color: "#fff",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
              }}
            />

            <FormControl variant="outlined" fullWidth>
              <InputLabel
                htmlFor="outlined-adornment-password"
                sx={{ color: "#fff" }}
              >
                Пароль
              </InputLabel>
              <OutlinedInput
                value={formData.password}
                onChange={handleChange}
                name="password"
                placeholder="Введите пароль"
                required
                sx={{
                  borderRadius: "9px",
                  marginBottom: "20px",
                  color: "#fff",
                  "& input": {
                    color: "#fff",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#fff",
                  },
                }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#fff" }} />
                      ) : (
                        <Visibility sx={{ color: "#fff" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Пароль"
              />
            </FormControl>

            <button
              type="submit"
              className={styles.btn}
              disabled={isLoading} // Кнопка заблокирована при загрузке
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </form>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </ThemeProvider>
  );
}
