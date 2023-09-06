import { Link } from 'react-router-dom';
import { FontAwesome } from '../../../../utils/icons';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner';
import '../FeaturedTravels/FeaturedTravels.css';

export const FeaturedTravels = ({ data, error, loading }) => {
   if (error) return <div className='error-message featured'>{error}</div>;

   return (
      <>
         <h2 className='destinations__header' id='offer'>
            List of travels:
         </h2>
          <article className='destinations'>
            {loading && <LoadingSpinner loading={loading} />}
            {!data && <p>No travels available at this moment</p>}
            {data.map((value) => {
               return (
                  <div key={value?._id} className='destinations__wrapper'>
                     <div className='destinations__item'>
                        <img src={value?.image} className='destinations__img' alt='travel destination image' />
                        <div className={`unavailable ${value?.availablePlaces <= 0 ? '' : `hidden`}`}>
                           <p className='unavailable__text'>Temporary unavailable</p>
                        </div>
                        <div className='destinations__item-wrapper'>
                           <p className='destinations-name'>{value?.city}</p>
                           <p className='destinations-country'>
                              <FontAwesome iconName='location-dot' /> {value?.country}
                           </p>
                           <div className='destinations-date'>
                              <FontAwesome iconName='plane' />
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
