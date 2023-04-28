import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import '../RatingStarsSection/RatingStarsSection.css';
import { useFetch } from '../../../../api/useFetch';

export const RatingStars = ({ data, userData }) => {
   const [travelRate, setTravelRate] = useState(0);
   const [hover, setHover] = useState(0);
   const { fetchData, contextHolder } = useFetch();
   // const [stars, setStars] = useState('');
   // const { id } = useParams();

   // useEffect(() => {
   //    console.log(`stars effect`);
   //    const getLS = () => (localStorage.getItem('travel__rate__stars') ? JSON.parse(localStorage.getItem('travel__rate__stars')) : []);
   //    if (!getLS.length) return () => {};
   //    const check = getLS.map((value) => value.travelID === id && value.userID === userData.id);
   //    if (check) setStars(<span className='star'>&#9733;</span>);
   //    else setStars(`koksod`);

   //    getLS();
   // }, [id]);

   // const saveToLS = (dataObj) => {
   //    localStorage.setItem('travel_rate__stars', JSON.stringify(dataObj));
   // };

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
                        // saveToLS({ travelID: data, userID: userData.id });
                     }}
                     onMouseEnter={() => setHover(index)}
                     onMouseLeave={() => setHover(travelRate)}
                  >
                     {/* {stars} */}
                     <span className='star'>&#9733;</span>
                  </div>
               );
            })}
         </div>
      </>
   );
};
