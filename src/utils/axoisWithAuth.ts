import axios from 'axios';

export const baseURL = 'https://foodtrucktracker-be.herokuapp.com';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: baseURL,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export default axiosWithAuth;
