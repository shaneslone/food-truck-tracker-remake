import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTruckRating, fetchCurrentTruck } from '../store/actions/trucks';
import { addFavoriteTruck, deleteFavoriteTruck } from '../store/actions/users';
import { RootState, Truck, User } from '../types';

export default function useFetchTruck(): [
  Truck,
  boolean,
  boolean,
  string,
  number,
  typeof handleRating,
  typeof getCustomerRating,
  typeof getFavoriteTruck,
  typeof handleFavoriteTruck
] {
  const dispatch = useDispatch();
  const { truckId } = useParams();

  const currentTruck = useSelector<RootState, Truck>(
    state => state.trucks.currentTruck
  );

  const loading = useSelector<RootState, boolean>(
    state => state.trucks.loading
  );

  const errorMessage = useSelector<RootState, string>(
    state => state.trucks.errorMessage
  );

  const user = useSelector<RootState, User>(state => state.user.user);

  const isDiner =
    user.roles.filter(role => role.role.name === 'DINER').length > 0;

  const [rating, setRating] = useState<number>(0);

  const getFavoriteTruck = () =>
    user.favoriteTrucks.filter(
      truck => truck.truck.truckId === currentTruck.truckId
    ).length;

  const handleFavoriteTruck = async () => {
    if (getFavoriteTruck()) {
      dispatch(deleteFavoriteTruck(currentTruck.truckId));
    } else {
      dispatch(addFavoriteTruck(currentTruck.truckId));
    }
  };

  const handleRating = async (rating: number) => {
    setRating(rating);
    dispatch(addTruckRating(currentTruck.truckId, rating));
  };

  const getCustomerRating = () => {
    const result = currentTruck.reviews.filter(
      review => review.diner.userid === user.userid
    );
    if (result.length) return result[0].score;
    return 0;
  };

  useEffect(() => {
    if (truckId) dispatch(fetchCurrentTruck(truckId));
  }, [dispatch, truckId]);

  return [
    currentTruck,
    isDiner,
    loading,
    errorMessage,
    rating,
    handleRating,
    getCustomerRating,
    getFavoriteTruck,
    handleFavoriteTruck,
  ];
}
