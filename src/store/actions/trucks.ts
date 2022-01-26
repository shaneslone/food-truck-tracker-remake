import { Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
import { Truck, TruckMin } from "../../types";
import axiosWithAuth from "../../utils/axoisWithAuth";

export const TRUCK_LOADING = "TRUCK_LOADING";
export const TRUCK_FAIL = "TRUCK_FAIL";
export const TRUCK_SUCCESS = "TRUCK_SUCCESS";

export interface TruckLoading {
  type: typeof TRUCK_LOADING;
}

export interface TruckFail {
  type: typeof TRUCK_FAIL;
  payload: string;
}

export interface TruckSuccess {
  type: typeof TRUCK_SUCCESS;
}

export type TruckDispatchTypes = TruckLoading | TruckFail | TruckSuccess;

export const createTruck =
  (newTruck: TruckMin, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().post<Truck>("/trucks/truck", newTruck);

      dispatch({
        type: TRUCK_SUCCESS,
      });

      navigate(`/truck/${res.data.truckId}`);
    } catch (e) {
      console.log(e);
      dispatch({
        type: TRUCK_FAIL,
        payload: "Failed to create new truck!",
      });
    }
  };
