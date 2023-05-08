import React, { useContext, useEffect, useState } from 'react';
import './RatingStarsSection.css';
import { AuthContext } from '../../../../context/AuthContext';
import { RatingStars } from '../RatingStars/RatingStars';

export const RatingStarsSection = ({ data }) => {
   const { userData } = useContext(AuthContext);
   const [rate, setRate] = useState(true);

   const score = data?.userVotes === 0 ? '' : (data?.travelRate / data?.userVotes).toFixed(1, 0);

   // find in arr if user already votes for current travel
   useEffect(() => {
      if (!userData) setRate(true);
      else {
         const checkVotes = userData?.userVotes.some((value) => value.travelID === data._id);
         if (!checkVotes) setRate(false);
         else setRate(true);
      }
   }, [userData]);

   return (
      <div className='star__rating'>
         <div className='overall__travel-rating'>
            {rate ? '' : <RatingStars travelID={data?._id} userData={userData} />}
            <p>{!score ? <span>Be first to rate</span> : <span className='btn'>{score}/5</span>} </p>
            <p>{!score ? '' : `overall travel rate based on user votes`}</p>
         </div>
      </div>
   );
};
