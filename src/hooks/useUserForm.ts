import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { createUser } from '../store/actions/users';
import { UserMin } from '../types';

const useUserForm = (): [
  UserMin,
  UserMin,
  boolean,
  (location: string) => void,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLFormElement>) => void
] => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: UserMin = {
    username: '',
    password: '',
    email: '',
    currentLocation: '',
    accountType: '',
  };

  const [userInfo, setUserInfo] = useState<UserMin>(initialValues);
  const [errors, setErrors] = useState<UserMin>(initialValues);
  const [disabled, setDisabled] = useState<boolean>(true);

  const userValidation = yup.object().shape({
    username: yup
      .string()
      .min(6, 'Username must be at least 6 characters')
      .required('Username is required.'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .required('Password is required.'),
    email: yup.string().email().required('Email is required.'),
    currentLocation: yup.string().required('Current Location is required!'),
    accountType: yup
      .string()
      .oneOf(['DINER', 'OPERATOR'])
      .required('Please select an account type.'),
  });

  useEffect(() => {
    userValidation.isValid(userInfo).then(valid => {
      setDisabled(!valid);
    });
  }, [userValidation, userInfo]);

  const validateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const typeOfValue =
      e.target.type === 'radio' ? e.target.id : e.target.value;
    yup
      .reach(userValidation, e.target.name)
      .validate(typeOfValue)
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const typeOfValue =
      e.target.type === 'radio' ? e.target.id : e.target.value;
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      [e.target.name]: typeOfValue,
    }));
    validateChange(e);
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUser(userInfo, navigate));
    setUserInfo(initialValues);
  };

  const updateLocation = (location: string) => {
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      currentLocation: location,
    }));
  };

  return [userInfo, errors, disabled, updateLocation, onChange, onSubmit];
};

export default useUserForm;
