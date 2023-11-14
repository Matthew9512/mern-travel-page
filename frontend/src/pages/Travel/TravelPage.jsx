import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../api/useAxios';
import { CommentsSection } from './Components/CommentsSection/CommentsSection';
import { BookingSection } from './Components/BookingSection/BookingSection';
import { RatingStarsSection } from './Components/RatingStarsSection/RatingStarsSection';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { FontAwesome } from '../../utils/icons';

export const TravelPage = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { fetchData, data, loading } = useAxios(false);

   useEffect(() => {
      // if id is NOT correct then redirect to error page
      if (!id.match(/^[0-9a-fA-F]{24}$/)) return navigate('*');

      fetchData({
         url: `/search/${id}`,
      });
   }, []);

   if (!data) return <LoadingSpinner loading={loading} />;

   return (
      <section className='single'>
         <div className='single__wrapper'>
            <div className='single__wrapper-details'>
               <img src={data?.image} alt='vacation picture' className='single__img' />
               <div className={`unavailable ${!data?.availablePlaces ? '' : `hidden`}`}>
                  <p className='unavailable__text'>Temporary unavailable</p>
               </div>
               <div className='single__details-wrapper'>
                  <div className='single__details'>
                     <div>
                        <p className='destinations-name'>{data?.city}</p>
                        <p className='destinations-country'>
                           <FontAwesome iconName='location-dot' /> {data?.country}
                        </p>
                        <div className='destinations-date'>
                           <FontAwesome iconName='plane' />
                           <p>
                              {data?.startDate} - {data?.endDate}
                           </p>
                        </div>
                     </div>
                     <div className='destinations__item-details'>
                        <p className='destinations-category'>{data?.type}</p>
                        <p className='destinations-price'>{data?.price}$ / per</p>
                     </div>
                     <Link to='/' className='single__btn btn'>
                        Go Back
                     </Link>
                  </div>
                  <RatingStarsSection data={data} />
               </div>
               <p className='single-description'>
                  <span>About travel:</span> {data?.description}
               </p>
            </div>
            {!data ? '' : <BookingSection travelData={data} />}
         </div>
         <CommentsSection id={id} />
      </section>
   );
};
