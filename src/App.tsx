import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TruckMap from './components/TruckMap';
import Login from './components/Login';
import AddUserForm from './components/AddUserForm';
import PrivateRoute from './components/PrivateRoute';
import AddTruck from './components/AddTruck';
import AddMenuItem from './components/AddMenuItem';
import TruckInfo from './components/TruckInfo';
import LandingPage from './components/landing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/map' element={<PrivateRoute component={TruckMap} />} />
        <Route path='/truck/:truckId' element={<TruckInfo />} />
        <Route
          path='/addtruck'
          element={<PrivateRoute component={AddTruck} />}
        />
        <Route
          path='/truck/:truckId/addmenuitem'
          element={<PrivateRoute component={AddMenuItem} />}
        />
        <Route path='signup' element={<AddUserForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
