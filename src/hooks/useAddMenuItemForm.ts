import { ChangeEvent, useEffect, useState } from 'react';
import { MenuItemMin, MenuItem, RootState, Truck } from '../types';
import * as yup from 'yup';
import axiosWithAuth from '../utils/axoisWithAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/actions/users';

export default function useAddMenuItem(
  values: MenuItem | undefined = undefined
): [
  MenuItemMin,
  MenuItemMin,
  boolean,
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLFormElement>) => Promise<void>
] {
  const initalValues: MenuItemMin = {
    itemName: '',
    itemDescription: '',
    itemPrice: 0,
  };

  const dispatch = useDispatch();

  const [menuItem, setMenuItem] = useState<MenuItemMin | MenuItem>(
    values ? values : initalValues
  );

  const [errors, setErrors] = useState<MenuItemMin>(initalValues);

  const [disabled, setDisabled] = useState<boolean>(true);

  const [ajaxError, setAjaxError] = useState<string>('');

  const truckToEdit = useSelector<RootState, Truck | null>(
    state => state.trucks.truckToEdit
  );

  const menuItemValidation = yup.object().shape({
    itemName: yup.string().trim().required('Menu Item must have a name.'),
    itemDescription: yup
      .string()
      .trim()
      .required('Please provide an item description'),
    itemPrice: yup
      .number()
      .min(0, 'Price can not be less than 0')
      .required('Please provide an item price'),
  });

  useEffect(() => {
    menuItemValidation.isValid(menuItem).then(valid => setDisabled(!valid));
  }, [menuItemValidation, menuItem]);

  const validateChange = (e: ChangeEvent<HTMLInputElement>) => {
    yup
      .reach(menuItemValidation, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' }));
      })
      .catch((error: yup.ValidationError) => {
        setErrors(prevErrors => ({
          ...prevErrors,
          [e.target.name]: error.errors[0],
        }));
      });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMenuItem(menuItem => ({
      ...menuItem,
      [e.target.name]: e.target.value,
    }));
    validateChange(e);
  };

  const isMenuItem = (item: MenuItem | MenuItemMin): item is MenuItem => {
    return 'menuId' in item;
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isMenuItem(menuItem)) {
        await axiosWithAuth().put(
          `/menuitems/menuitem/${menuItem.menuId}`,
          menuItem
        );
      } else {
        if (truckToEdit) {
          await axiosWithAuth().post(
            `/menuitems/menuitem/truck/${truckToEdit.truckId}`,
            menuItem
          );
        }
      }
      dispatch(getUser());
    } catch (e) {
      setAjaxError('Failed to create new menu item!');
    }
  };

  return [menuItem, errors, disabled, ajaxError, onChange, onSubmit];
}
