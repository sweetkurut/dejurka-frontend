import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  Modal,
  Box,
  Snackbar,
  Alert, // Добавляем Snackbar
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.scss";
import { Edit, Delete } from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "../../../../../store/services/UserApi";
import Loader from "../../../../Ui/Loader/Loader";

const TableUsers = () => {
  const { data: users, error, isLoading, refetch } = useGetUsersQuery();
  const [deleteUsers] = useDeleteUsersMutation();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEstateId, setSelectedEstateId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleDeleteClick = (id) => {
    setSelectedEstateId(id);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedEstateId) {
      try {
        await deleteUsers(selectedEstateId).unwrap();
        console.log(`Пользователь с ID ${selectedEstateId} удалена.`);
        showSnackbar("Пользователь успешно удален!", "success");
        refetch();
      } catch (err) {
        console.error("Ошибка при удалении пользователя:", err);
        showSnackbar("Ошибка при удалении пользователя!", "error"); // Показать Snackbar при ошибке
      } finally {
        setOpenDialog(false);
        setSelectedEstateId(null);
      }
    }
  };

  // const handleNavigate = (id) => {
  //   navigate(`/real-user/${id}`);
  // };

  if (error) {
    return (
      <div className={styles.error}>
        <Typography variant="h6" color="error">
          Ошибка при загрузке данных
        </Typography>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <TableContainer
        component={Paper}
        className={styles.wrapper}
        sx={{
          borderRadius: "14px !important",
          border: "1px solid #f8f8f8",
        }}
      >
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Логин</TableCell>
              {/* <TableCell>Пароль</TableCell> */}
              <TableCell>ФИО</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Опыт работы</TableCell>
              <TableCell>Кол-во продаж</TableCell>
              <TableCell>Адрес проживания</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) &&
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {dayjs(user.created_at).format("DD.MM.YYYY")}
                  </TableCell>
                  <TableCell>
                    <Avatar
                      alt="Недвижка"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjes9As0KBB_ufe_alnSpFsvwJLQFkrZws7g&s"
                      onClick={() =>
                        handleImageClick(
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjes9As0KBB_ufe_alnSpFsvwJLQFkrZws7g&s"
                        )
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  {/* <TableCell>{user.password}</TableCell> */}
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.experience}</TableCell>
                  <TableCell>{user.salesCount}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>
                    <Tooltip title="Редактирование">
                      <button className={styles.iconButton}>
                        <Edit />
                      </button>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <button
                        className={styles.iconButton}
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        <Delete />
                      </button>
                    </Tooltip>
                    <Tooltip title="Подробнее">
                      <button
                        className={styles.iconButton}
                        onClick={() => handleNavigate(user.id)}
                      >
                        <ArrowForwardOutlinedIcon />
                      </button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-product-modal-title"
        aria-describedby="delete-product-modal-description"
      >
        <Box className={styles.modal}>
          <h4 className={styles.modal_title}>Вы точно хотите удалить?</h4>
          <div className={styles.modalActions}>
            <div className={styles.btn_wrapper}>
              <button
                onClick={handleDeleteConfirm}
                className={styles.delete_btn}
              >
                Удалить
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className={styles.cancel_btn}
              >
                Отмена
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <IconButton
          style={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Увеличенное изображение"
              style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            />
          )}
        </DialogContent>
      </Dialog>

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
    </>
  );
};

export default TableUsers;