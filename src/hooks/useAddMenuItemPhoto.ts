import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../store/actions/users';
import { ItemPhoto, MenuItem } from '../types';
import axiosWithAuth from '../utils/axoisWithAuth';

const useAddMenuItemPhoto = (
  menuItem: MenuItem
): [string, typeof onChange, typeof onSubmit] => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState<string>('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPhoto = {
      menuItem: menuItem,
      menuItemPhotoId: 0,
      url: url,
    };
    axiosWithAuth().post<ItemPhoto>(
      `/menuitems/menuitem/${menuItem.menuId}/photo/`,
      newPhoto
    );
    dispatch(getUser());
    setUrl('');
  };

  return [url, onChange, onSubmit];
};

export default useAddMenuItemPhoto;
