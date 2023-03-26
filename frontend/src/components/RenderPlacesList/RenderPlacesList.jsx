import React, { useContext } from 'react';
import './RenderPlacesList.css';
import { PlacesList } from '../PlacesList/PlacesList';
import { GlobalContext } from '../../context/GlobalContext';

export const RenderPlacesList = () => {
   const { state } = useContext(GlobalContext);

   if (!state.length) return <p className='error__message'>Looks like we couldn't find data that matches your criteria</p>;

   return <>{<p>Loading...</p> && <PlacesList />}</>;
};
// return <>{!state?.length ? <ErrorFallback error={state} /> : <PlacesList />}</>;
