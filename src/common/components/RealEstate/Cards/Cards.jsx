import { useGetRealEstatesQuery } from "../../../../store/services/RealEstateApi";
import { estates } from "../../../helpers";
import Loader from "../../../Ui/Loader/Loader";
import styles from "./cards.module.scss";

const Cards = () => {
  const { data: estates, error, isLoading } = useGetRealEstatesQuery();

  console.log(estates, "Список недаижимостей");

  if (error)
    return (
      <div className={styles.error}>
        <h3>Ошибка при загрузке данных</h3>
      </div>
    );

  if (isLoading) return <Loader />;

  return (
    <div className={styles.cards}>
      {estates?.map((estate) => (
        <div className={styles.card} key={estate.id}>
          <img
            // src={estate.photos}
            src="https://elitka.kg/images/object/740/dom_royal_palace.jpg"
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
