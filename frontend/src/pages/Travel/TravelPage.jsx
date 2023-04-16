import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../api/useFetch';
import { CommentsSection } from './Components/CommentsSection/CommentsSection';
import { BookingSection } from './Components/BookingSection/BookingSection';
import { RatingStarsSection } from './Components/RatingStarsSection/RatingStarsSection';

export const TravelPage = () => {
   const { id } = useParams();
   const { fetchData, data, errors, loading } = useFetch();

   // for development
   useEffect(() => {
      console.log(`travelsection effect`);
   }, []);

   useEffect(() => {
      fetchData(`/search/${id}`);
   }, []);

   if (errors) return <p>{errors}</p>;
   if (!data) return <p>Loading...</p>;

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
                              <i className='fa-solid fa-location-dot'></i> {data?.country}
                           </p>
                           <div className='destinations-date'>
                              <i className='fa-solid fa-plane'></i>
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
               {!data ? <p>Loading...</p> : <BookingSection data={data} id={id} />}
            </div>
            <CommentsSection id={id} />
         </section>
      </main>
   );
};
