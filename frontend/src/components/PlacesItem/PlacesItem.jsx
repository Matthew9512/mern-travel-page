import React from 'react';
import { Link } from 'react-router-dom';

export const PlacesItem = ({ data }) => {
  const state = data.at(0);

  return (
    <section className='single'>
      <div className='single__wrapper'>
        <img src={state.image} alt='vacation picture' className='single__img' />
        <div className='single__info'>
          <div className='single__details'>
            <div>
              <p className='destinations-name'>{state.city}</p>
              <p className='destinations-country'>
                <i className='fa-solid fa-location-dot'></i> {state.country}
              </p>
              <p className='date destinations-start-date'>begin: {state.startDate}</p>
              <p className='date destinations-end-date'>end: {state.endDate}</p>
            </div>
            <div className='destinations__item-details'>
              <p className='destinations-category'>{state.type}</p>
              <p className='destinations-price'>{state.price}$</p>
            </div>
            <Link to={'/'} className='single__btn btn'>
              Go Back
            </Link>
          </div>
          <p className='single-description'>{state.description}</p>
        </div>
      </div>
    </section>
  );
};
