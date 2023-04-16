import React, { useState } from 'react';
import '../RatingStarsSection/RatingStarsSection.css';
import { useFetch } from '../../../../api/useFetch';

export const RatingStars = ({ data }) => {
   const [travelRate, setTravelRate] = useState(0);
   const [hover, setHover] = useState(0);
   const { fetchData, contextHolder } = useFetch();

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
                        fetchData(`/places/rate`, 'PATCH', { id: data, travelRate: index });
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
