import { AxiosResponse } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMenuItem } from "../store/actions/trucks";
import { RootState, User, MenuItem } from "../types";
import axiosWithAuth from "../utils/axoisWithAuth";

export default function useMenuCardItem(
  menuItem: MenuItem
): [number, typeof handleRating, typeof getCustomerRating] {
  const user = useSelector<RootState, User>((state) => state.user.user);
  const [rating, setRating] = useState<number>(0);
  const dispatch = useDispatch();

  const handleRating = async (rating: number) => {
    setRating(rating);
    let res: AxiosResponse<MenuItem>;
    if (getCustomerRating()) {
      res = await axiosWithAuth().put<MenuItem>(
        `/menuitems/menuitem/${menuItem.menuId}/rating/${rating / 20}`
      );
    } else {
      res = await axiosWithAuth().post<MenuItem>(
        `/menuitems/menuitem/${menuItem.menuId}/rating/${rating / 20}`
      );
    }

    dispatch(updateMenuItem(res.data));
  };

  const getCustomerRating = () => {
    const result = menuItem.customerRatings.filter(
      (review) => review.diner.userid === user.userid
    );
    if (result.length) return result[0].score;
    return 0;
  };

  return [rating, handleRating, getCustomerRating];
}
