import React from 'react';
import { Link } from 'react-router-dom';
import { PlacesItemAside } from '../PlacesItemAside/PlacesItemAside';
import { PostsSection } from '../PostsSection/PostsSection';
import './PlacesItem.css';

export const PlacesItem = ({ data }) => {
   // scroll to top at render
   window.scrollTo(0, 0);

   return (
      <section className='single'>
         <div className='single__wrapper'>
            <div className='single__wrapper-details'>
               <img src={data?.image} alt='vacation picture' className='single__img' />
               <div className={`unavailable ${!data?.availablePlaces ? '' : `hidden`}`}>
                  <p className='unavailable__text'>Temporary unavailable</p>
               </div>
               <div className='single__details-wrapper'>
                  <div className='single__details'>
                     <div>
                        <p className='destinations-name'>{data?.city}</p>
                        <p className='destinations-country'>
                           <i className='fa-solid fa-location-dot'></i> {data?.country}
                        </p>
                        <div className='destinations-date'>
                           <i className='fa-solid fa-plane'></i>
                           <p>
                              {data?.startDate} - {data?.endDate}
                           </p>
                        </div>
                     </div>
                     <div className='destinations__item-details'>
                        <p className='destinations-category'>{data?.type}</p>
                        <p className='destinations-price'>{data?.price}$ / per</p>
                     </div>
                     <Link to={'/'} className='single__btn btn'>
                        Go Back
                     </Link>
                  </div>
                  <div className='travel-rate'>
                     *****
                     <div className='travel-rate-result'>4/5</div>
                  </div>
               </div>
               <p className='single-description'>
                  <span>About travel:</span> {data?.description}
               </p>
            </div>
            {data === null ? <p>Loading...</p> : <PlacesItemAside data={data} />}
         </div>
         <PostsSection />
      </section>
   );
};
