import { Dispatch } from 'react';
import { User } from '../../types';
import axiosWithAuth from '../../utils/axoisWithAuth';

export const USER_LOADING = 'USER_LOADING';
export const USER_FAIL = 'USER_FAIL';
export const USER_SUCCESS = 'USER_SUCESS';

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserFail {
  type: typeof USER_FAIL;
}

export interface UserSuccess {
  type: typeof USER_SUCCESS;
  payload: User;
}

export type UserDispatchTypes = UserLoading | UserFail | UserSuccess;

export const getUser = () => async (dispatch: Dispatch<UserDispatchTypes>) => {
  try {
    dispatch({
      type: USER_LOADING,
    });

    const res = await axiosWithAuth().get('/users/getuserinfo');

    dispatch({
      type: USER_SUCCESS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: USER_FAIL,
    });
  }
};
