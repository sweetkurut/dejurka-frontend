import AddEstates from "./AddEstates";
import Cards from "./Cards/Cards";
import styles from "./styles.module.scss";

const ReaslEstate = () => {
  return (
    <div className={styles.wrapper}>
      <AddEstates />
      <div className={styles.container}>
        <Cards />
      </div>
    </div>
  );
};

export default ReaslEstate;
