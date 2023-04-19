import React, { useContext, useEffect, useState } from 'react';
import { UserPageNav } from '../User/Components/UserPageNav/UserPageNav';
import { AuthContext } from '../../context/AuthContext';
import { API, useFetch } from '../../api/useFetch';

export const BookingsPage = () => {
   const { userData } = useContext(AuthContext);
   const { fetchData, data, ready } = useFetch();
   const [userBookings, setUserBookings] = useState([]);

   useEffect(() => {
      fetchData(`/user/${userData.id}`);
   }, [userData.id]);

   // wait for fulfilled respond then activate function for fatching users bookings
   useEffect(() => {
      if (!ready) return;
      else fetchUserBookings();
   }, [ready]);

   // fetch all users bookings
   const fetchUserBookings = () => {
      Promise.all(
         data.data.map((value) => {
            fetch(`${API}/search/${value}`)
               .then((res) => res.json())
               .then((bookings) => setUserBookings((prev) => [...prev, bookings]));
         })
      );
   };

   // if (!userBookings || !data) return <p>Loading...</p>;
   // if (!data) return <p>Loading...</p>;
   if (!userBookings.length) return <p>you have no bookings yet</p>;
   console.log(userBookings);

   return (
      <section className='user__panel'>
         <UserPageNav />
         <p className='user__bookings-header'>List of your bookings:</p>
         {userBookings.map((value) => {
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
      </section>
   );
};
