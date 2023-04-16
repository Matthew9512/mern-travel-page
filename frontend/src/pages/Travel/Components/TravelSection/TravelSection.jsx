import React, { useEffect } from 'react';
import './TravelSection.css';
import { Link } from 'react-router-dom';
import { BookingSection } from '../BookingSection/BookingSection';
import { CommentsSection } from '../CommentsSection/CommentsSection';

export const TravelSection = ({ data, errors }) => {
   if (errors) return <p>{errors}</p>;
   if (!data) return <p>Loading...</p>;

   // for development
   useEffect(() => {
      console.log(`travelsection effect`);
   }, []);

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
                  {/* <RatingStars data={data} /> */}
               </div>
               <p className='single-description'>
                  <span>About travel:</span> {data?.description}
               </p>
            </div>
            <BookingSection />
         </div>
         <CommentsSection />
      </section>
   );
};
