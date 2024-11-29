import TableUsers from "./components/tableUser/TableUser";
import styles from "./styles.module.scss";

const Users = () => {
  return (
    <div className={styles.wrapper}>
      <TableUsers />
    </div>
  );
};

export default Users;
