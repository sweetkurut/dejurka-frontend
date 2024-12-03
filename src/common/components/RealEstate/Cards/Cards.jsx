import React, { useState } from "react";
import {
  useDeleteRealEstateMutation,
  useGetRealEstatesQuery,
} from "../../../../store/services/RealEstateApi";
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
import styles from "./cards.module.scss";
import { Edit, Delete } from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import dayjs from "dayjs";
import Loader from "../../../Ui/Loader/Loader";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const { data: estates, error, isLoading, refetch } = useGetRealEstatesQuery();
  const [deleteRealEstate] = useDeleteRealEstateMutation();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEstateId, setSelectedEstateId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8000";

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
        await deleteRealEstate(selectedEstateId).unwrap();
        console.log(`Недвижимость с ID ${selectedEstateId} удалена.`);
        showSnackbar("Недвижимость удалена успешно!", "success");
        refetch();
      } catch (err) {
        console.error("Ошибка при удалении недвижимости:", err);
        showSnackbar("Ошибка при удалении недвижимости!", "error"); // Показать Snackbar при ошибке
      } finally {
        setOpenDialog(false);
        setSelectedEstateId(null);
      }
    }
  };

  const handleNavigate = (id) => {
    navigate(`/real-estate/${id}`);
  };

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

  console.log(estates, "данные из бэкенда");

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
              <TableCell>Название ЖК</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>Строительная компания</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell
                sx={{
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // gap: "10px",
                  // textAlign: "center",
                  paddingLeft: "40px !important",
                  // bgcolor: "black",
                }}
              >
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(estates) &&
              estates.map((estate, index) => {
                // Берем первое изображение из массива photos и добавляем BASE_URL
                const imageUrl = estate.photos?.[1]
                  ? `${BASE_URL}${estate.photos[1]}`
                  : null;

                return (
                  <TableRow key={estate.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {dayjs(estate.created_at).format("DD.MM.YYYY")}
                    </TableCell>
                    <TableCell>
                      {imageUrl ? (
                        <Avatar
                          alt="Недвижка"
                          src={imageUrl}
                          onClick={() => handleImageClick(imageUrl)}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        "Нет изображения"
                      )}
                    </TableCell>
                    <TableCell>{estate.residentialComplexName}</TableCell>
                    <TableCell>{estate.description}</TableCell>
                    <TableCell>{estate.exactAddress}</TableCell>
                    <TableCell>{estate.buildingCompanyName}</TableCell>
                    <TableCell>{estate.priceVisible}</TableCell>
                    <TableCell>
                      <Tooltip title="Редактирование">
                        <button className={styles.iconButton}>
                          <Edit />
                        </button>
                      </Tooltip>
                      <Tooltip title="Удалить">
                        <button
                          className={styles.iconButton}
                          onClick={() => handleDeleteClick(estate.id)}
                        >
                          <Delete />
                        </button>
                      </Tooltip>
                      <Tooltip title="Подробнее">
                        <button
                          className={styles.iconButton}
                          onClick={() => handleNavigate(estate.id)}
                        >
                          <ArrowForwardOutlinedIcon />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
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

export default Cards;
