import { Dispatch } from 'react';
import { Truck } from '../../types';
import axiosWithAuth from '../../utils/axoisWithAuth';

export const TRUCK_LOADING = 'TRUCK_LOADING';
export const TRUCK_FAIL = 'TRUCK_FAIL';
export const TRUCK_SUCCESS = 'TRUCK_SUCCESS';
export const TRUCK_LOADING_COMPLETE = 'TRUCK_LOADING_COMPLETE';

export interface TruckLoading {
  type: typeof TRUCK_LOADING;
}

export interface TruckFail {
  type: typeof TRUCK_FAIL;
  payload: string;
}

export interface TruckSuccess {
  type: typeof TRUCK_SUCCESS;
  payload: Truck[];
}

export interface TruckLoadingComplete {
  type: typeof TRUCK_LOADING_COMPLETE;
}

export type TruckDispatchTypes =
  | TruckLoading
  | TruckFail
  | TruckSuccess
  | TruckLoadingComplete;

export const fetchTrucks =
  () => async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().get('/trucks/trucks');

      dispatch({
        type: TRUCK_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to load trucks.',
      });
    } finally {
      dispatch({
        type: TRUCK_LOADING_COMPLETE,
      });
    }
  };

export const fetchTrucksByCuisine =
  (cuisineType: string) => async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().get(
        `/trucks/trucks/cuisinetype/${cuisineType}`
      );

      dispatch({
        type: TRUCK_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to load trucks.',
      });
    } finally {
      dispatch({
        type: TRUCK_LOADING_COMPLETE,
      });
    }
  };

export const fetchTrucksByRating =
  (rating: string) => async (dispatch: Dispatch<TruckDispatchTypes>) => {
    try {
      dispatch({
        type: TRUCK_LOADING,
      });

      const res = await axiosWithAuth().get(`/trucks/trucks/rating/${rating}`);

      dispatch({
        type: TRUCK_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: TRUCK_FAIL,
        payload: 'Failed to load trucks.',
      });
    } finally {
      dispatch({
        type: TRUCK_LOADING_COMPLETE,
      });
    }
  };
