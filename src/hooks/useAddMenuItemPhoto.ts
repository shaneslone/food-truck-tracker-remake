import { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTruckToEdit } from '../store/actions/trucks';
import { getUser } from '../store/actions/users';
import { ItemPhoto, MenuItem, RootState, Truck } from '../types';
import axiosWithAuth from '../utils/axoisWithAuth';

const useAddMenuItemPhoto = (
  menuItem: MenuItem
): [string, typeof onChange, typeof onSubmit] => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState<string>('');
  const currentTruckToEdit = useSelector<RootState, Truck | null>(
    state => state.trucks.truckToEdit
  );
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPhoto = {
      menuItem: menuItem,
      menuItemPhotoId: 0,
      url: url,
    };
    await axiosWithAuth().post<ItemPhoto>(
      `/menuitems/menuitem/${menuItem.menuId}/photo/`,
      newPhoto
    );
    if (currentTruckToEdit) {
      const res = await axiosWithAuth().get<Truck>(
        `/trucks/truck/${currentTruckToEdit.truckId}`
      );
      dispatch(setTruckToEdit(res.data));
    }
    dispatch(getUser());
    setUrl('');
  };

  return [url, onChange, onSubmit];
};

export default useAddMenuItemPhoto;
