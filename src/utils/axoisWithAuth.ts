import axios from 'axios';

export const baseURL = 'http://localhost:2019';

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
