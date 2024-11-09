import { useState } from "react";
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

import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

export default function Login() {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const formSubmit = (e) => {
    e.preventDefault();

    if (!formData.login || !formData.password) {
      setSnackbarMessage("Заполните поля");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setSnackbarMessage("Успешно вошли!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.banner}>
        <Container component="main" maxWidth="md" className={styles.container}>
          <form className={styles.form} onSubmit={formSubmit}>
            <h2 className={styles.title}>Авторизация</h2>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoComplete="login"
              autoFocus
              value={formData.login}
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
              onClick={() => navigate("/sales")}
            >
              Войти
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

          <div className={styles.companyInfo}>
            <div className={styles.email_company}>
              <p>Разработано с Укиев Айдин Талантович</p>
              <p>+996(552)-22-07-90</p>
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}
