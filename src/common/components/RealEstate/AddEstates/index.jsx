import { useState } from "react";
import styles from "./style.module.scss";
import { Drawer, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const AddEstates = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleFileRemove = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.add_btn} onClick={() => toggleDrawer(true)}>
        Добавить недвижимость
      </button>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        PaperProps={{ style: { width: "550px" } }}
        onClose={() => toggleDrawer(false)}
      >
        <div className={styles.drawer}>
          <h3 className={styles.form_title}>Добавление недвижимости</h3>
          <form className={styles.form}>
            <div className={styles.form_group_wrapper}>
              <div className={styles.file_wrap}>
                <label className={styles.file_label}>
                  <input
                    type="file"
                    className={styles.input_file}
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  Выберите файл
                </label>
                {selectedFiles.length > 0 && (
                  <div className={styles.preview_container}>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className={styles.preview_item}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Файл ${index + 1}`}
                          className={styles.preview_image}
                        />
                        <IconButton
                          className={styles.delete_icon}
                          onClick={() => handleFileRemove(index)}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.form_group}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Строительная компания"
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Наименование жилового комплекса"
                />
              </div>
              <div className={styles.form_group}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Секция"
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Тип ремонта"
                />
              </div>
              <div className={styles.form_group}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Расположение объекта"
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Точный адрес недвижимости"
                />
              </div>
              <div className={styles.form_group}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Этаж, на котором находится квартира"
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Тип документации"
                />
              </div>
              <div className={styles.form_group}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Тип отопления"
                />
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "9px",
                    },
                  }}
                  className={styles.input}
                  fullWidth
                  type="text"
                  id="title"
                  label="Описание мебели в квартире"
                />
              </div>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9px",
                  },
                }}
                className={styles.input}
                fullWidth
                type="text"
                rows={4}
                multiline
                id="title"
                label="Описание"
              />
            </div>
            <div className={styles.form_group}>
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9px",
                  },
                }}
                className={styles.input}
                fullWidth
                type="number"
                id="price"
                label=" Количество комнат"
              />
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9px",
                  },
                }}
                className={styles.input}
                fullWidth
                type="number"
                id="price"
                label="Общая площадь в квадратных метрах"
              />
            </div>

            <button type="submit" className={styles.add_btn}>
              Добавить
            </button>
          </form>
        </div>
      </Drawer>
    </div>
  );
};

export default AddEstates;
