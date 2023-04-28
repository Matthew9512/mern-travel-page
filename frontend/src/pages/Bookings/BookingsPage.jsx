import React, { useContext, useEffect, useState } from 'react';
import { UserPageNav } from '../User/Components/UserPageNav/UserPageNav';
import { AuthContext } from '../../context/AuthContext';
import { API } from '../../api/useFetch';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BookingsPage = () => {
   const { userData } = useContext(AuthContext);
   const [userBookings, setUserBookings] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      fetchUserBookings();
   }, [userData]);

   // fetch all users bookings
   const fetchUserBookings = () => {
      // return if user didnt book any travel
      if (!userData?.bookings) return;
      setLoading(true);
      Promise.all(
         userData?.bookings.map((value) => {
            fetch(`${API}/search/${value}`)
               .then((res) => res.json())
               .then((bookings) => {
                  console.log(bookings);
                  setUserBookings((prev) => [...prev, bookings]);
                  setLoading(false);
               });
         })
      );
   };

   return (
      <section className='user__panel'>
         <LoadingSpinner loading={loading} />
         <UserPageNav />
         <p className='user__bookings-header'>List of your bookings:</p>
         {!userBookings.length ? (
            <p>Your bookings list is empty</p>
         ) : (
            userBookings.map((value) => {
               return (
                  <div key={value?._id} className='user__bookings-list'>
                     <img src={value?.image} className='user__bookings-img' alt='vacation img' />
                     <div>
                        <p>{value?.city}</p>
                        <p>{value?.price}$</p>
                        <div className='destinations-date'>
                           {/* <FontAwesomeIcon icon='plane' /> */}
                           <i className='fa-solid fa-plane'></i>
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
// import React, { useContext, useEffect, useState } from 'react';
// import { UserPageNav } from '../User/Components/UserPageNav/UserPageNav';
// import { AuthContext } from '../../context/AuthContext';
// import { API, useFetch } from '../../api/useFetch';
// import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
// import { LoadingButton } from '../../components/LoadingButton';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export const BookingsPage = () => {
//    const { userData } = useContext(AuthContext);
//    const { fetchData, loading, data, ready } = useFetch();
//    const [userBookings, setUserBookings] = useState([]);

//    useEffect(() => {
//       fetchData(`/user/${userData.id}`);
//    }, []);

//    // wait for fulfilled respond then activate function for fatching users bookings
//    useEffect(() => {
//       if (!ready) return;
//       else fetchUserBookings();
//    }, [ready]);

//    // fetch all users bookings
//    const fetchUserBookings = () => {
//       Promise.all(
//          data.data.map((value) => {
//             fetch(`${API}/search/${value}`)
//                .then((res) => res.json())
//                .then((bookings) => setUserBookings((prev) => [...prev, bookings]));
//          })
//       );
//    };

//    if (!data) return <LoadingSpinner loading={loading} />;
//    console.log(userBookings);

//    return (
//       <section className='user__panel'>
//          <UserPageNav />
//          <p className='user__bookings-header'>List of your bookings:</p>
//          {!userBookings.length
//             ? <LoadingButton /> || <p>you have no bookings yet</p>
//             : userBookings.map((value) => {
//                  return (
//                     <div key={value?._id} className='user__bookings-list'>
//                        <img src={value?.image} className='user__bookings-img' alt='vacation img' />
//                        <div>
//                           <p>{value?.city}</p>
//                           <p>{value?.price}$</p>
//                           <div className='destinations-date'>
//                              {/* <FontAwesomeIcon icon='plane' /> */}
//                              <i className='fa-solid fa-plane'></i>
//                              <p>
//                                 {value?.startDate} - {value?.endDate}
//                              </p>
//                           </div>
//                        </div>
//                     </div>
//                  );
//               })}
//       </section>
//    );
// };
