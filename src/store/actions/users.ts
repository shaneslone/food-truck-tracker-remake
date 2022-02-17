import { Dispatch } from 'react';
import { User, UserMin } from '../../types';
import axiosWithAuth, { baseURL } from '../../utils/axoisWithAuth';
import axios from 'axios';
import { Credentials } from '../../types';
import { NavigateFunction } from 'react-router-dom';

export const USER_LOADING = 'USER_LOADING';
export const USER_FAIL = 'USER_FAIL';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';

export interface UserLoading {
  type: typeof USER_LOADING;
}

export interface UserFail {
  type: typeof USER_FAIL;
  payload: string;
}

export interface UserSuccess {
  type: typeof USER_SUCCESS;
  payload: User;
}

export interface UserLogout {
  type: typeof USER_LOGOUT;
}

interface Token {
  access_token: string;
}

export type UserDispatchTypes =
  | UserLoading
  | UserFail
  | UserSuccess
  | UserLogout;

export const createUser =
  (newUser: UserMin, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      dispatch({
        type: USER_LOADING,
      });

      const res = await axios.post<Token>(`${baseURL}/createnewuser`, newUser);

      localStorage.setItem('token', res.data.access_token);

      getUser(navigate)(dispatch);
    } catch (e) {
      console.log(e);
      dispatch({
        type: USER_FAIL,
        payload: 'Failed to create new user!',
      });
    }
  };

export const getUser =
  (navigate: NavigateFunction) =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      dispatch({
        type: USER_LOADING,
      });

      const res = await axiosWithAuth().get<User>('/users/getuserinfo');

      dispatch({
        type: USER_SUCCESS,
        payload: res.data,
      });

      localStorage.setItem('user', JSON.stringify(res.data));

      navigate('/map');
    } catch (e) {
      dispatch({
        type: USER_FAIL,
        payload: 'Failed to fetch user information!',
      });
    }
  };

export const login =
  (credentials: Credentials, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    const auth = `${process.env.REACT_APP_OAUTHCLIENTID}:${process.env.REACT_APP_OAUTHCLIENTSECRET}`;
    try {
      dispatch({
        type: USER_LOADING,
      });
      const res = await axios.post<Token>(
        `${baseURL}/login`,
        `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa(auth)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      localStorage.setItem('token', res.data.access_token);

      getUser(navigate)(dispatch);
    } catch (e) {
      dispatch({
        type: USER_FAIL,
        payload: 'Incorrect username or password!',
      });
    }
  };

export const addFavoriteTruck =
  (truckId: number) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      dispatch({
        type: USER_LOADING,
      });

      const res = await axiosWithAuth().post<User>(
        `/users/user/favorite/truck/${truckId}`
      );
      dispatch({
        type: USER_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: USER_FAIL,
        payload: 'User Failed',
      });
    }
  };

export const deleteFavoriteTruck =
  (truckId: number) => async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      dispatch({
        type: USER_LOADING,
      });

      const res = await axiosWithAuth().delete<User>(
        `/users/user/favorite/truck/${truckId}`
      );
      dispatch({
        type: USER_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: USER_FAIL,
        payload: 'User Failed',
      });
    }
  };

export const userLogout =
  (navigate: NavigateFunction) =>
  async (dispatch: Dispatch<UserDispatchTypes>) => {
    try {
      await axiosWithAuth().get('/logout');

      localStorage.clear();

      dispatch({
        type: USER_LOGOUT,
      });

      navigate('/');
    } catch (e) {
      dispatch({
        type: USER_FAIL,
        payload: 'Failed to log out.',
      });
    }
  };
