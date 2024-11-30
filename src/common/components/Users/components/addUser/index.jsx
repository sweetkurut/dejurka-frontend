import React from "react";
import styles from "./styles.module.scss";

const AddUser = () => {
  return (
    <div className={styles.wrapper}>
      <button className={styles.add_btn}>Добавить пользователя</button>
    </div>
  );
};

export default AddUser;
