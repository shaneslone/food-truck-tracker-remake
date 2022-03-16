import { ChangeEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchTrucksByCuisine } from '../store/actions/trucks';

const CuisineFilter = () => {
  const dispatch = useDispatch();
  const [cusineType, setCusineType] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCusineType(e.target.value);
  };

  const onSubmit = () => {
    dispatch(fetchTrucksByCuisine(cusineType));
  };

  return (
    <>
      <Form.Control
        type='text'
        name='cusineType'
        value={cusineType}
        onChange={onChange}
        placeholder='What type of food are you hungry for?'
      />
      <Button variant='primary' onClick={onSubmit}>
        Filter
      </Button>
    </>
  );
};

export default CuisineFilter;
