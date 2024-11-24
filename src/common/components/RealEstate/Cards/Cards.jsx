import React, { useState } from "react";
import { useGetRealEstatesQuery } from "../../../../store/services/RealEstateApi";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./cards.module.scss";
import { Edit, Delete } from "@mui/icons-material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

const Cards = () => {
  const { data: estates, error, isLoading } = useGetRealEstatesQuery();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
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
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <TableContainer component={Paper} className={styles.wrapper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Название ЖК</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>Строительная компания</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estates?.map((estate, index) => (
              <TableRow key={estate.id}>
                <TableCell>{index + 1}</TableCell>
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
                    <button className={styles.iconButton}>
                      <Delete />
                    </button>
                  </Tooltip>
                  <Tooltip title="Подробнее">
                    <button className={styles.iconButton}>
                      <ArrowForwardOutlinedIcon />
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
    </>
  );
};

export default Cards;
