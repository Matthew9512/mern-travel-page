import { useContext, useEffect, useState } from 'react';
import { UserPageNav } from '../UserPageNav/UserPageNav';
import { AuthContext } from '../../../../context/AuthContext';
import { _API } from '../../../../api/useAxios';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner';
import { FontAwesome } from '../../../../utils/icons';
import '../../../../components/LoadingSpinner/LoadingSpinner';
/**
 * @todo error handling
 */

export const UserBookings = () => {
   const { userData } = useContext(AuthContext);
   const [bookingList, setBookingList] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   // fetch all users bookings
   const fetchUserBookings = () => {
      // return if user didnt book any travel
      if (!userData) return;
      setLoading(true);
      Promise.all(
         userData?.bookings.map((value) => {
            fetch(`${_API}search/${value}`)
               .then((res) => res.json())
               .then((bookings) => {
                  setBookingList((prev) => [...prev, bookings]);
                  if (!res.ok) throw new Error('wrong path');
                  else setBookingList((prev) => [...prev, bookings]);
               })
               .catch((err) => setError(err.message));
         })
      );
      setLoading(false);
   };

   useEffect(() => {
      fetchUserBookings();
   }, [userData]);

   return (
      <section className='user__panel'>
         <LoadingSpinner loading={loading} />
         <UserPageNav />
         <p className='user__bookings-header'>List of your bookings:</p>
         {!bookingList.length ? (
            <p>Your bookings list is empty</p>
         ) : (
            bookingList.map((value) => {
               return (
                  <div key={value?._id} className='user__bookings-list'>
                     <img src={value?.image} className='user__bookings-img' alt='vacation img' />
                     <div>
                        <p>{value?.city}</p>
                        <p>{value?.price}$</p>
                        <div className='destinations-date'>
                           <FontAwesome iconName='plane' />
                           <p>
                              {value?.startDate} - {value?.endDate}
                           </p>
                        </div>
                     </div>
                  </div>
               );
            })
         )}
      </section>
   );
};
