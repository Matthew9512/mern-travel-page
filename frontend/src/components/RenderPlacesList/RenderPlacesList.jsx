import React, { useContext } from 'react';
import './RenderPlacesList.css';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';
import { PlacesList } from '../PlacesList/PlacesList';
import { GlobalContext } from '../../context/GlobalContext';

export const RenderPlacesList = () => {
  const { state } = useContext(GlobalContext);

  return (
    <>
      {/* <div className='skeleton__container'>
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div> */}
      {!state?.length ? <ErrorFallback error={state} /> : <PlacesList />}
    </>
  );
  // return <>{!state?.length ? <ErrorFallback error={state} /> : <PlacesList />}</>;
};
