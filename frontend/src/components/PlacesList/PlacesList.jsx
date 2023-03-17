import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';

export const PlacesList = () => {
  const { state } = useContext(GlobalContext);
  {
    /* <h2 className='destinations__header'>Most popular places:</h2>
    <article className='destinations'> */
  }

  return (
    <>
      <h2 className='destinations__header'>Most popular places:</h2>
      <article className='destinations'>
        <Spinner />
        {state.map((value) => {
          return (
            <div key={value._id} className='destinations__wrapper'>
              <div className='destinations__item'>
                <img src={value.image} className='destinations__img' alt='travel destination image' />
                <div className='destinations__item-wrapper'>
                  <p className='destinations-name'>{value.city}</p>
                  <p className='destinations-country'>
                    <i className='fa-solid fa-location-dot'></i> {value.country}
                  </p>
                  <p className='date destinations-start-date'>begin: {value.startDate}</p>
                  <p className='date destinations-end-date'>end: {value.endDate}</p>
                  <div className='destinations__item-details'>
                    <p className='destinations-category'>{value.type}</p>
                    <p className='destinations-price'>{value.price}$</p>
                  </div>
                  <p className='destinations-description'>{value.description}</p>
                  <Link to={`/search/${value._id}`} className='btn btn-more'>
                    See more
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </article>
    </>
  );
};
