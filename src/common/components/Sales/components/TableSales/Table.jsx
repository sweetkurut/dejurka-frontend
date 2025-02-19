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
import styles from "./table.module.scss";
import { Edit, Delete } from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  useDeleteSalesMutation,
  useGetSalesQuery,
} from "../../../../../store/services/SalesApi";
import Loader from "../../../../Ui/Loader/Loader";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";

const TableSales = () => {
  const { data: sales, error, isLoading, refetch } = useGetSalesQuery();
  const [deleteSales] = useDeleteSalesMutation();
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
        await deleteSales(selectedEstateId).unwrap();
        console.log(`продажа с ID ${selectedEstateId} удалена.`);
        showSnackbar("Недвижимость удалена успешно!", "success");
        refetch();
      } catch (err) {
        console.error("Ошибка при удалении недвижимости:", err);
        showSnackbar("Ошибка при удалении недвижимости!", "error");
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
              <TableCell>Дата продажи</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Название ЖК</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>Строительная компания</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Продавец</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(sales) &&
              sales.map((estate, index) => (
                <TableRow key={estate.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {dayjs(estate.saleDate).format("DD.MM.YYYY")}
                  </TableCell>
                  <TableCell>
                    <Avatar
                      alt="Недвижка"
                      src="https://ned.kg//storage/12839/63722748b4d5b_F65B61C5-E333-4C35-8A17-8648DA0E73E5-1.jpeg"
                      onClick={() =>
                        handleImageClick(
                          "https://ned.kg//storage/12839/63722748b4d5b_F65B61C5-E333-4C35-8A17-8648DA0E73E5-1.jpeg"
                        )
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                  <TableCell>
                    {estate.realEstate.residentialComplexName}
                  </TableCell>
                  <TableCell>{estate.realEstate.description}</TableCell>
                  <TableCell>{estate.realEstate.exactAddress}</TableCell>
                  <TableCell>{estate.realEstate.buildingCompanyName}</TableCell>
                  <TableCell>{estate.realEstate.priceVisible}</TableCell>
                  <TableCell>{estate.user.fullName}</TableCell>
                  <TableCell>{estate.user.role}</TableCell>
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
                    <Tooltip title="Поменять статус">
                      <button className={styles.iconButton}>
                        <BookmarkAddedOutlinedIcon />
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

export default TableSales;
