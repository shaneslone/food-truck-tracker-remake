import { useState, ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { Credentials } from '../types';
import { login } from '../store/actions/users';

const useLogin = (): [
  Credentials,
  Credentials,
  boolean,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLFormElement>) => void
] => {
  const dispatch = useDispatch();

  const initalState: Credentials = {
    username: '',
    password: '',
  };

  const [credentials, setCredentials] = useState<Credentials>(initalState);
  const [errors, setErrors] = useState<Credentials>(initalState);
  const [disabled, setDisabled] = useState<boolean>(true);

  const loginValidation = yup.object().shape({
    username: yup.string().required('Username is required.'),
    password: yup.string().required('Password is required.'),
  });

  useEffect(() => {
    loginValidation.isValid(credentials).then(valid => {
      setDisabled(!valid);
    });
  }, [loginValidation, credentials]);

  const validateChange = (e: ChangeEvent<HTMLInputElement>) => {
    yup
      .reach(loginValidation, e.target.name)
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [e.target.name]: e.target.value,
    }));
    validateChange(e);
  };

  const onSubmit = (e: ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(login(credentials));
    setCredentials(initalState);
  };
  return [credentials, errors, disabled, onChange, onSubmit];
};

export default useLogin;
