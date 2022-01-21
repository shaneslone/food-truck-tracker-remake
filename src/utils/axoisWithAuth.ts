import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:2019/',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export default axiosWithAuth;
