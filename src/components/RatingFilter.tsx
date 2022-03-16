import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { fetchTrucksByRating } from '../store/actions/trucks';

const RatingFilter = () => {
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState<number>(0);

  const onChange = (rating: number) => {
    setRatingVal(rating);
    dispatch(fetchTrucksByRating(`${rating}`));
  };
  return (
    <Rating
      ratingValue={ratingVal}
      onClick={onChange}
      allowHalfIcon
      transition
      size={20}
      fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
    />
  );
};

export default RatingFilter;
