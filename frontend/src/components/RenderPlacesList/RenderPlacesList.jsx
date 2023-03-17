import React, { useContext } from 'react';
import './RenderPlacesList.css';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { PlacesList } from '../PlacesList/PlacesList';
import { GlobalContext } from '../../context/GlobalContext';

export const RenderPlacesList = () => {
  const { state } = useContext(GlobalContext);

  return (
    <>
      {!state?.length ? <ErrorMessage /> : <PlacesList />}
      {/* <h2 className='destinations__header'>Most popular places:</h2>
      <article className='destinations'>{!state?.length ? <ErrorMessage /> : <PlacesList />}</article> */}
    </>
  );
};
