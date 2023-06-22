import { useState } from 'react';
import { useAxios } from '../../../../api/useAxios';
import '../RatingStarsSection/RatingStarsSection.css';

export const RatingStars = ({ travelID, userData }) => {
   const [travelRate, setTravelRate] = useState(0);
   const [hover, setHover] = useState(0);
   const { fetchData, contextHolder } = useAxios(true);

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
                        fetchData({
                           method: `PUT`,
                           url: `/places/rate`,
                           data: { id: travelID, travelRate: index, userID: userData?._id },
                        });
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
