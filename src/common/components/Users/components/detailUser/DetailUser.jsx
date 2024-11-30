import React from "react";
import { useParams } from "react-router-dom";
import { useGetUsersDetailQuery } from "../../../../../store/services/UserApi";
import Loader from "../../../../Ui/Loader/Loader";

const DetailUser = () => {
  const { id } = useParams();
  const { data: userDetails, error, isLoading } = useGetUsersDetailQuery(id);

  if (isLoading) return <Loader />;

  if (error) return <div>Произошла ошибка при получении данных</div>;
  console.log(id);

  console.log(userDetails, "sdcsdcsdcsdc");

  return <div>DetailUser</div>;
};

export default DetailUser;
