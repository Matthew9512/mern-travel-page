import React from 'react';
import { Link } from 'react-router-dom';
import { PostsSection } from '../PostsSection/PostsSection';
import './PlacesItem.css';

export const PlacesItem = ({ data }) => {
   return (
      <section className='single'>
         <div className='single__wrapper'>
            <img src={data?.image} alt='vacation picture' className='single__img' />
            <div className='single__info'>
               <div className='single__details'>
                  <div>
                     <p className='destinations-name'>{data?.city}</p>
                     <p className='destinations-country'>
                        <i className='fa-solid fa-location-dot'></i> {data?.country}
                     </p>
                     <p className='date destinations-start-date'>begin: {data?.startDate}</p>
                     <p className='date destinations-end-date'>end: {data?.endDate}</p>
                  </div>
                  <div className='destinations__item-details'>
                     <p className='destinations-category'>{data?.type}</p>
                     <p className='destinations-price'>{data?.price}$</p>
                  </div>
                  <Link to={'/'} className='single__btn btn'>
                     Go Back
                  </Link>
               </div>
               <p className='single-description'>
                  <span>About travel:</span> {data?.description}
               </p>
            </div>
         </div>
         <PostsSection />
      </section>
   );
};
