import { Navigate } from 'react-router-dom';

interface IProps {
  component: React.FC;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  return localStorage.getItem('token') ? (
    <Component {...rest} />
  ) : (
    <Navigate to='/' />
  );
};

export default PrivateRoute;
