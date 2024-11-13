import { estates } from "../../../helpers";
import styles from "./cards.module.scss";

const Cards = () => {
  return (
    <div className={styles.cards}>
      {estates.map((estate) => (
        <div className={styles.card} key={estate.id}>
          <img
            src={estate.photos}
            alt={estate.name}
            className={styles.card_img}
          />
          <div className={styles.card__content}>
            <h3>{estate.residentialComplexName}</h3>
            <p>{estate.description}</p>

            <div className={styles.label}>
              <label>Адресс:</label>
              <p>{estate.exactAddress}</p>
            </div>
            <div className={styles.label}>
              <label>Строительная компания:</label>
              <p>{estate.buildingCompanyName}</p>
            </div>
            <div className={styles.label}>
              <label>Цена:</label>
              <p>{estate.priceVisible}</p>
            </div>
            <button className={styles.btn_card}>Подробнее</button>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Cards;
