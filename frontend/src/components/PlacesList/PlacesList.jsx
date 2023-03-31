import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';

export const PlacesList = () => {
   const { state } = useContext(GlobalContext);

   return (
      <>
         <h2 className='destinations__header'>Most popular places:</h2>
         <article className='destinations'>
            {state.map((value) => {
               return (
                  <div key={value._id} className='destinations__wrapper'>
                     <div className='destinations__item'>
                        <img src={value.image} className='destinations__img' alt='travel destination image' />
                        <div className={`unavailable ${!value.availablePlaces ? '' : `hidden`}`}>
                           <p className='unavailable__text'>Temporary unavailable</p>
                        </div>
                        <div className='destinations__item-wrapper'>
                           <p className='destinations-name'>{value.city}</p>
                           <p className='destinations-country'>
                              <i className='fa-solid fa-location-dot'></i> {value.country}
                           </p>
                           <p className='date destinations-start-date'>begin: {value.startDate}</p>
                           <p className='date destinations-end-date'>end: {value.endDate}</p>
                           <div className='destinations__item-details'>
                              <p className='destinations-category'>{value.type}</p>
                              <p className='destinations-price'>{value.price}$ / per</p>
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
