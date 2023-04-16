import React from 'react';
import { Link } from 'react-router-dom';
import '../FeaturedTravels/FeaturedTravels.css';

export const FeaturedTravels = ({ data, errors }) => {
   // loading
   if (!data) return <p>Loading..</p>;
   if (errors) return <p>{errors}</p>;

   return (
      <>
         <h2 className='destinations__header'>Most popular places:</h2>
         <article className='destinations'>
            {data.map((value) => {
               return (
                  <div key={value?._id} className='destinations__wrapper'>
                     <div className='destinations__item'>
                        <img src={value?.image} className='destinations__img' alt='travel destination image' />
                        <div className={`unavailable ${!value?.availablePlaces ? '' : `hidden`}`}>
                           <p className='unavailable__text'>Temporary unavailable</p>
                        </div>
                        <div className='destinations__item-wrapper'>
                           <p className='destinations-name'>{value?.city}</p>
                           <p className='destinations-country'>
                              <i className='fa-solid fa-location-dot'></i> {value?.country}
                           </p>
                           <div className='destinations-date'>
                              <i className='fa-solid fa-plane'></i>
                              <p>
                                 {value?.startDate} - {value?.endDate}
                              </p>
                           </div>
                           <div className='destinations__item-details'>
                              <p className='destinations-category'>{value?.type}</p>
                              <p className='destinations-price'>{value?.price}$ / per</p>
                           </div>
                           <p className='destinations-description'>{value?.description}</p>
                           <Link to={`/search/${value?._id}`} className='btn btn-more'>
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
