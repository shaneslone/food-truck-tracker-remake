import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TruckMap from './components/TruckMap';
import Login from './components/Login';
import UserForm from './components/AddUserForm';
import PrivateRoute from './components/PrivateRoute';
import AddTruck from './components/AddTruck';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/map' element={<PrivateRoute component={TruckMap} />} />
        <Route
          path='/addtruck'
          element={<PrivateRoute component={AddTruck} />}
        />
        <Route path='signup' element={<UserForm />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
