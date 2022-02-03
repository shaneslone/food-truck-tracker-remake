import { TruckMin } from '../types';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import axiosWithAuth from '../utils/axoisWithAuth';

const useAddTruckForm = (): [
  TruckMin,
  TruckMin,
  boolean,
  string,
  (date: Date) => void,
  (location: string) => void,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLFormElement>) => Promise<void>
] => {
  const navigate = useNavigate();
  const initalValues: TruckMin = {
    name: '',
    imageOfTruck: '',
    cuisineType: '',
    currentLocation: '',
    departureTime: new Date(),
  };

  const [truckInfo, setTruckInfo] = useState<TruckMin>(initalValues);
  const [errors, setErrors] = useState<TruckMin>(initalValues);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [ajaxError, setAjaxError] = useState<string>('');

  const truckValidation = yup.object().shape({
    name: yup.string().required('Truck must have a name.'),
    imageOfTruck: yup.string().optional(),
    cuisineType: yup.string().required('Curise type is required.'),
    currentLocation: yup.string().required('Current location is required.'),
    departureTime: yup
      .date()
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
      departureTime: date,
    }));
  };

  const updateLocation = (location: string): void => {
    setTruckInfo(prevTruckInfo => ({
      ...prevTruckInfo,
      currentLocation: location,
    }));
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosWithAuth().post('/trucks/truck', truckInfo);
      navigate('/map');
    } catch (e) {
      setAjaxError('Failed to create new truck!');
    }

    setTruckInfo(initalValues);
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