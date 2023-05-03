import React, { useState } from 'react';
import { useFetch } from '../../../../api/useFetch';
import '../RatingStarsSection/RatingStarsSection.css';

export const RatingStars = ({ travelID, userData }) => {
   const [travelRate, setTravelRate] = useState(0);
   const [hover, setHover] = useState(0);
   const { fetchData, contextHolder } = useFetch();

   // save id of travel in LS
   const saveToLS = (travelID) => {
      const lsItems = localStorage.getItem('travel__rate__stars') ? JSON.parse(localStorage.getItem('travel__rate__stars')) : [];

      lsItems.push(travelID);
      localStorage.setItem('travel__rate__stars', JSON.stringify(lsItems));
   };

   return (
      <>
         <p className='star__rating-header'>Rate this travel:</p>
         <div className='star__rating-wrapper'>
            {contextHolder}
            {[...Array(5)].map((_, index) => {
               index += 1;
               return (
                  <div
                     type='button'
                     key={index}
                     className={index <= (hover || travelRate) ? 'on' : 'off'}
                     onClick={() => {
                        setTravelRate(index);
                        fetchData(`/places/rate`, 'PUT', { id: travelID, travelRate: index, userID: userData.at(0)?.id });
                        saveToLS({ travelID });
                     }}
                     onMouseEnter={() => setHover(index)}
                     onMouseLeave={() => setHover(travelRate)}
                  >
                     <span className='star'>&#9733;</span>
                  </div>
               );
            })}
         </div>
      </>
   );
};
