import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesome } from '../../../../utils/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../FeaturedTravels/FeaturedTravels.css';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner';

export const FeaturedTravels = ({ data, error, loading }) => {
   if (error) return <p className='error-message featured'>{error}</p>;

   return (
      <>
         <h2 className='destinations__header'>Featured travels:</h2>
         <article className='destinations'>
            <LoadingSpinner loading={loading} />
            {data.map((value) => {
               return (
                  <div key={value?._id} className='destinations__wrapper'>
                     <div className='destinations__item'>
                        <img src={value?.image} className='destinations__img' alt='travel destination image' />
                        <div className={`unavailable ${!value?.availablePlaces ? '' : `hidden`}`}>
                           <p className='unavailable__text'>Temporary unavailable</p>
                        </div>
                        <div className='destinations__item-wrapper'>
                           <p className='destinations-name'>{value?.city}</p>
                           <p className='destinations-country'>
                              <FontAwesome iconName='location-dot' /> {value?.country}
                              {/* <FontAwesomeIcon icon='location-dot' /> {value?.country} */}
                              {/* <i className='fa-solid fa-location-dot'></i> {value?.country} */}
                           </p>
                           <div className='destinations-date'>
                              <FontAwesome iconName='plane' />
                              {/* <FontAwesomeIcon icon='plane' /> */}
                              {/* <i className='fa-solid fa-plane'></i> */}
                              <p>
                                 {value?.startDate} - {value?.endDate}
                              </p>
                           </div>
                           <div className='destinations__item-details'>
                              <p className='destinations-category'>{value?.type}</p>
                              <p className='destinations-price'>{value?.price}$ / per</p>
                           </div>
                           <p className='destinations-description'>{value?.description}</p>
                           <Link to={`/search/${value?._id}`} className='btn btn-more'>
                              See more
                           </Link>
                        </div>
                     </div>
                  </div>
               );
            })}
         </article>
      </>
   );
};
