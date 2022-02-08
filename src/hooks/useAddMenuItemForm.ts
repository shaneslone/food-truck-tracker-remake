import { ChangeEvent, useEffect, useState } from "react";
import { MenuItemMin } from "../types";
import * as yup from "yup";
import axiosWithAuth from "../utils/axoisWithAuth";
import { useParams } from "react-router-dom";

export default function useAddMenuItem(): [
  MenuItemMin,
  MenuItemMin,
  boolean,
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (e: ChangeEvent<HTMLFormElement>) => Promise<void>
] {
  const initalValues: MenuItemMin = {
    itemName: "",
    itemDescription: "",
    itemPrice: 0,
  };

  const [menuItem, setMenuItem] = useState<MenuItemMin>(initalValues);

  const [errors, setErrors] = useState<MenuItemMin>(initalValues);

  const [disabled, setDisabled] = useState<boolean>(true);

  const [ajaxError, setAjaxError] = useState<string>("");

  const { truckId } = useParams();

  const menuItemValidation = yup.object().shape({
    itemName: yup.string().trim().required("Menu Item must have a name."),
    itemDescription: yup
      .string()
      .trim()
      .required("Please provide an item description"),
    itemPrice: yup
      .number()
      .min(0, "Price can not be less than 0")
      .required("Please provide an item price"),
  });

  useEffect(() => {
    menuItemValidation.isValid(menuItem).then((valid) => setDisabled(!valid));
  }, [menuItemValidation, menuItem]);

  const validateChange = (e: ChangeEvent<HTMLInputElement>) => {
    yup
      .reach(menuItemValidation, e.target.name)
      .validate(e.target.value)
      .then(() => {
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
      })
      .catch((error: yup.ValidationError) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: error.errors[0],
        }));
      });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMenuItem((menuItem) => ({
      ...menuItem,
      [e.target.name]: e.target.value,
    }));
    validateChange(e);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosWithAuth().post(
        `/menuitems/menuitem/truck/${truckId}`,
        menuItem
      );
    } catch (e) {
      setAjaxError("Failed to create new menu item!");
    }
  };

  return [menuItem, errors, disabled, ajaxError, onChange, onSubmit];
}
