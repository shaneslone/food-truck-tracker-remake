import { Dispatch } from "react";
import { Truck, TruckMin } from "../../types";
import axiosWithAuth, { baseURL } from "../../utils/axoisWithAuth";
import axios from "axios";

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
  payload: Truck;
}

export type TruckDispatchTypes = TruckLoading | TruckFail | TruckSuccess;

export const createTruck =
  (newTruck: TruckMin) => async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().post<Truck>("/trucks", newTruck);
    } catch (e) {
      console.log(e);
      dispatch({
        type: TRUCK_FAIL,
        payload: "Failed to create new truck!",
      });
    }
  };
