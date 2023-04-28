import React, { useContext } from 'react';
import './RatingStarsSection.css';
import { AuthContext } from '../../../../context/AuthContext';
import { RatingStars } from '../RatingStars/RatingStars';

/**
 * @todo rerender after submiting vote
 * @todo dont display start if user already voted?
 */

export const RatingStarsSection = ({ data }) => {
   const { userData } = useContext(AuthContext);

   const score = data?.userVotes === 0 ? '' : (data?.travelRate / data?.userVotes).toFixed(1, 0);

   return (
      <div className='star__rating'>
         <div className='overall__travel-rating'>
            {userData.username === 'Log in' ? '' : <RatingStars data={data?._id} userData={userData} />}
            <p>{!score ? <span>Be first to rate</span> : <span className='btn'>{score}/5</span>} </p>
            <p>{!score ? '' : `overall travel rate based on user votes`}</p>
         </div>
      </div>
   );
};
