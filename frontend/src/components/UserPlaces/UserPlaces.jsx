import React, { useEffect, useState } from 'react';
import './UserPlaces.css';

export const UserPlaces = () => {
   const [bookings, setBookings] = useState(null);
   let bookingsArr = [];

   useEffect(() => {
      const userBookings = async () => {
         const { id } = JSON.parse(localStorage.getItem('travel__user'));
         const res = await fetch(`http://localhost:8000/users/${id}`);
         const { data } = await res.json();

         data.forEach(async (value) => {
            const travel = await fetch(`http://localhost:8000/search/${value}`);
            const dataa = await travel.json();
            bookingsArr.push(dataa);

            setTimeout(() => {
               setBookings(bookingsArr);
            }, 500);
         });
      };

      userBookings();
   }, []);

   if (!bookings) return <h1>Loading...</h1>;

   return (
      <>
         <p className='user__bookings-header'>List of your bookings:</p>
         {bookings.map((value) => {
            return (
               <div key={value?._id} className='user__bookings-list'>
                  <img src={value?.image} className='user__bookings-img' alt='vacation img' />
                  <div>
                     <p>{value?.city}</p>
                     <p>{value?.price}$</p>
                     <div className='destinations-date'>
                        <i className='fa-solid fa-plane'></i>
                        <p>
                           {value?.startDate} - {value?.endDate}
                        </p>
                     </div>
                  </div>
               </div>
            );
         })}
      </>
   );
};
