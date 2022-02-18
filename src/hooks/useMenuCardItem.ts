import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMenuItemRating } from '../store/actions/trucks';
import { RootState, User, MenuItem } from '../types';

export default function useMenuCardItem(
  menuItem: MenuItem
): [number, boolean, typeof handleRating, typeof getCustomerRating] {
  const user = useSelector<RootState, User>(state => state.user.user);

  const isDiner =
    user.roles.filter(role => role.role.name === 'DINER').length > 0;

  const [rating, setRating] = useState<number>(0);

  const dispatch = useDispatch();

  const handleRating = async (rating: number) => {
    setRating(rating);
    dispatch(addMenuItemRating(menuItem.menuId, rating));
  };

  const getCustomerRating = () => {
    const result = menuItem.customerRatings.filter(
      review => review.diner.userid === user.userid
    );
    if (result.length) return result[0].score;
    return 0;
  };

  return [rating, isDiner, handleRating, getCustomerRating];
}
