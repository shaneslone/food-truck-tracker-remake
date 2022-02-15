import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCurrentTruck } from "../store/actions/trucks";
import { RootState, Truck, User } from "../types";
import axiosWithAuth from "../utils/axoisWithAuth";

export default function useFetchTruck(): [
  Truck,
  Boolean,
  String,
  number,
  (rating: number) => Promise<void>,
  () => number
] {
  const dispatch = useDispatch();
  const { truckId } = useParams();

  const currentTruck = useSelector<RootState, Truck>(
    (state) => state.trucks.currentTruck
  );

  const loading = useSelector<RootState, Boolean>(
    (state) => state.trucks.loading
  );

  const errorMessage = useSelector<RootState, String>(
    (state) => state.trucks.errorMessage
  );

  const user = useSelector<RootState, User>((state) => state.user.user);

  const [rating, setRating] = useState<number>(0);

  const handleRating = async (rating: number) => {
    setRating(rating);
    await axiosWithAuth().post(
      `trucks/truck/${currentTruck.truckId}/rating/${rating}`
    );
  };

  const getCustomerRating = () => {
    const result = currentTruck.reviews.filter(
      (review) => review.diner.userid === user.userid
    );
    if (result.length) return result[0].score;
    return 0;
  };

  useEffect(() => {
    if (truckId) dispatch(fetchCurrentTruck(truckId));
  }, [dispatch, truckId]);

  return [
    currentTruck,
    loading,
    errorMessage,
    rating,
    handleRating,
    getCustomerRating,
  ];
}
