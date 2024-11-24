import SearchComponent from "../../shared/Search/Serach";
import AddEstates from "./AddEstates";
import Cards from "./Cards/Cards";
import styles from "./styles.module.scss";
import { useState } from "react";

const ReaslEstate = () => {
  const [showDrawer, isShowDrawer] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_addStates}>
        <AddEstates />
        <SearchComponent />
      </div>
      {/* <h2>Страница недвижимостей</h2> */}
      <div className={styles.container}>
        <Cards />
      </div>
    </div>
  );
};

export default ReaslEstate;
