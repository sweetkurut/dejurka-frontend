import React from "react";
import { useGetRealEstateDetailQuery } from "../../../../store/services/RealEstateApi";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import "./styles.scss";
import Loader from "../../../Ui/Loader/Loader";

const RealEstateDetail = () => {
  const { id } = useParams();

  const {
    data: getRealEstateDetail,
    error,
    isLoading,
  } = useGetRealEstateDetailQuery(id);

  console.log(getRealEstateDetail?.data, "Полученные данные");

  if (isLoading)
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  if (error)
    return <div className="error">Произошла ошибка при загрузке данных</div>;

  const {
    buildingCompanyName,
    residentialComplexName,
    section,
    renovation,
    district,
    exactAddress,
    numberOfRooms,
    totalArea,
    floor,
    documentation,
    heating,
    description,
    furniture,
    priceVisible,
    photos,
    created_at,
  } = getRealEstateDetail;

  return (
    <div className="container">
      <div className="real-estate-detail">
        {/* Слайдер фотографий */}
        <div className="real-estate-slider">
          {Array.isArray(photos) && photos.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
              style={{
                height: "300px",
                borderRadius: "10px",
                overflow: "hidden",
                width: "20%",
              }}
            >
              {photos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <img
                    // src="https://ned.kg//storage/12839/63722748b4d5b_F65B61C5-E333-4C35-8A17-8648DA0E73E5-1.jpeg"
                    alt={`Фото ${index + 1}`}
                    className="slider-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-photos">Нет фотографий</div>
          )}
        </div>

        {/* Основная информация */}
        <div className="real-estate-info">
          <h1>{residentialComplexName || "Недвижимость"}</h1>
          <p className="price">
            {priceVisible
              ? `${Number(priceVisible).toLocaleString()} c`
              : "Цена не указана"}
          </p>
          <div className="info-grid">
            <p>
              <strong>Застройщик:</strong> {buildingCompanyName || "Не указано"}
            </p>
            <p>
              <strong>Секция:</strong> {section || "Не указано"}
            </p>
            <p>
              <strong>Адрес:</strong> {exactAddress || "Не указано"}
            </p>
            <p>
              <strong>Район:</strong> {district || "Не указано"}
            </p>
            <p>
              <strong>Комнаты:</strong> {numberOfRooms || "Не указано"}
            </p>
            <p>
              <strong>Этаж:</strong> {floor || "Не указано"}
            </p>
            <p>
              <strong>Площадь:</strong>{" "}
              {totalArea ? `${totalArea} м²` : "Не указано"}
            </p>
            <p>
              <strong>Отопление:</strong> {heating || "Не указано"}
            </p>
            <p>
              <strong>Мебель:</strong> {furniture || "Не указано"}
            </p>
            <p>
              <strong>Ремонт:</strong> {renovation || "Не указано"}
            </p>
            <p>
              <strong>Описание:</strong> {description || "Нет описания"}
            </p>
          </div>
          <p className="date">
            Создано:
            {created_at
              ? new Date(created_at).toLocaleDateString("ru-RU")
              : "Дата не указана"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealEstateDetail;
