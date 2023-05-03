import React, { useContext, useState } from 'react';
import './RatingStarsSection.css';
import { AuthContext } from '../../../../context/AuthContext';
import { RatingStars } from '../RatingStars/RatingStars';

export const RatingStarsSection = ({ data }) => {
   const { userData, wasTravelRated } = useContext(AuthContext);
   const [displayStars, setDisplayStars] = useState(() => {
      if (!wasTravelRated.length) return '';
      const travelIDs = wasTravelRated.filter((value) => value.travelID === data._id);
      const IDs = travelIDs.map((post) => post.travelID);

      return IDs.length > 0 ? true : false;
   });

   const score = data?.userVotes === 0 ? '' : (data?.travelRate / data?.userVotes).toFixed(1, 0);

   return (
      <div className='star__rating'>
         <div className='overall__travel-rating'>
            {displayStars ? '' : <RatingStars travelID={data?._id} userData={userData} />}
            {/* {!userData.length ? '' : <RatingStars travelID={data?._id} userData={userData} />} */}
            <p>{!score ? <span>Be first to rate</span> : <span className='btn'>{score}/5</span>} </p>
            <p>{!score ? '' : `overall travel rate based on user votes`}</p>
         </div>
      </div>
   );
};
