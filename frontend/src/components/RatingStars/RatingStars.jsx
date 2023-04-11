import React, { useContext } from 'react';
import './RatingStars.css';

import { AuthContext } from '../../context/AuthContext';
import { DisplayRatingStars } from '../DisplayRatingStars/DisplayRatingStars';

export const RatingStars = ({ data }) => {
   const { auth } = useContext(AuthContext);

   const score = (data?.travelRate / data?.userVotes).toFixed(1, 0);

   return (
      <>
         <div className='star__rating'>
            {auth === 'Log in' ? '' : <DisplayRatingStars data={data} />}
            <div className='overall__travel-rating'>
               <p>{!score ? <span>Be first to rate</span> : <span className='btn'>{score}/5</span>} </p>
               <p>{!score ? '' : `overall travel rate based on user votes`}</p>
            </div>
         </div>
      </>
   );
};
