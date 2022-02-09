import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCurrentTruck } from "../store/actions/trucks";
import { RootState, Truck } from "../types";

export default function useFetchTruck(): [Truck, Boolean, String] {
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

  useEffect(() => {
    if (truckId) dispatch(fetchCurrentTruck(truckId));
  }, [dispatch, truckId]);

  return [currentTruck, loading, errorMessage];
}
