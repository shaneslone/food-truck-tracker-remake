import { RootState, Truck, TruckMin, TruckMinErrors, User } from '../types';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import axiosWithAuth from '../utils/axoisWithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/actions/users';
import { fetchTrucks, setTruckToEdit } from '../store/actions/trucks';

const useAddTruckForm = (
  truckToEdit: Truck | undefined = undefined
): [
  TruckMin,
  TruckMinErrors,
  boolean,
  string,
  (date: Date) => void,
  (location: string) => void,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLFormElement>) => Promise<void>
] => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector<RootState, User>(state => state.user.user);

  const initalValues: TruckMin = {
    name: '',
    imageOfTruck: '',
    cuisineType: '',
    currentLocation: '',
    departureTime: Date.now(),
  };
  const initalErrors: TruckMinErrors = {
    name: '',
    imageOfTruck: '',
    cuisineType: '',
    currentLocation: '',
    departureTime: '',
  };

  const [truckInfo, setTruckInfo] = useState<TruckMin | Truck>(
    truckToEdit ? truckToEdit : initalValues
  );
  const [errors, setErrors] = useState<TruckMinErrors>(initalErrors);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [ajaxError, setAjaxError] = useState<string>('');

  const truckValidation = yup.object().shape({
    name: yup.string().trim().required('Truck must have a name.'),
    imageOfTruck: yup.string().optional(),
    cuisineType: yup.string().trim().required('Curise type is required.'),
    currentLocation: yup.string().required('Current location is required.'),
    departureTime: yup
      .number()
      .required('Enter the departure time for your truck.'),
  });

  useEffect(() => {
    truckValidation.isValid(truckInfo).then(valid => {
      setDisabled(!valid);
    });
  }, [truckValidation, truckInfo]);

  const validateChange = (e: ChangeEvent<HTMLInputElement>) => {
    yup
      .reach(truckValidation, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' }));
      })
      .catch((error: ValidationError) => {
        setErrors(prevErrors => ({
          ...prevErrors,
          [e.target.name]: error.errors[0],
        }));
      });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTruckInfo(truckInfo => ({
      ...truckInfo,
      [e.target.name]: e.target.value,
    }));
    validateChange(e);
  };

  const changeDepartureDate = (date: Date): void => {
    setTruckInfo(prevTruckInfo => ({
      ...prevTruckInfo,
      departureTime: date.getTime(),
    }));
  };

  const updateLocation = (location: string): void => {
    setTruckInfo(prevTruckInfo => ({
      ...prevTruckInfo,
      currentLocation: location,
    }));
  };

  const isTurck = (truck: Truck | TruckMin): truck is Truck => {
    return 'truckId' in truck;
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isTurck(truckInfo)) {
        const res = await axiosWithAuth().put<Truck>(
          `trucks/truck/${truckInfo.truckId}`,
          {
            ...truckInfo,
            operator: user,
          }
        );
        dispatch(getUser());
        dispatch(setTruckToEdit(res.data));
        dispatch(fetchTrucks());
      } else {
        await axiosWithAuth().post('/trucks/truck', truckInfo);
        navigate('/map');
      }
    } catch (e) {
      setAjaxError('Failed to create new truck!');
    }
  };

  return [
    truckInfo,
    errors,
    disabled,
    ajaxError,
    changeDepartureDate,
    updateLocation,
    onChange,
    onSubmit,
  ];
};

export default useAddTruckForm;
