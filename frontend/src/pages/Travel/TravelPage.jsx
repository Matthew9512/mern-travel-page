import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAxios } from '../../api/useAxios';
import { CommentsSection } from './Components/CommentsSection/CommentsSection';
import { BookingSection } from './Components/BookingSection/BookingSection';
import { RatingStarsSection } from './Components/RatingStarsSection/RatingStarsSection';
import { Footer } from '../../components/Footer/Footer';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { FontAwesome } from '../../utils/icons';
import '../../assets/App.css';

export const TravelPage = () => {
   const { id } = useParams();
   const { fetchData, data, errors, loading } = useAxios();

   useEffect(() => {
      console.log(`travelsection effect`);
      fetchData({
         method: `GET`,
         url: `/search/${id}`,
      });
   }, []);

   if (errors) return <p>{errors}</p>;
   if (data.length === 0) return <LoadingSpinner loading={loading} />;

   return (
      <main className='container'>
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
                        <Link to={'/'} className='single__btn btn'>
                           Go Back
                        </Link>
                     </div>
                     <RatingStarsSection data={data} />
                  </div>
                  <p className='single-description'>
                     <span>About travel:</span> {data?.description}
                  </p>
               </div>
               {data.length === 0 ? '' : <BookingSection travelData={data} />}
            </div>
            <CommentsSection id={id} />
         </section>
         <Footer />
      </main>
   );
};
