import React, { useContext, useEffect, useRef, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BookingSection.css';
import { AuthContext } from '../../../../context/AuthContext';
import { useFetch } from '../../../../api/useFetch';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner';

/**
 * @todo fetch user in context
 */

export const BookingSection = ({ dataa, id }) => {
   const [personsAmount, setPersonsAmount] = useState(1);
   const [totalCost, setTotalCost] = useState(dataa?.price);
   const [bookedButton, setBookedButton] = useState(false);
   const { fetchData, data, loading, ready, contextHolder } = useFetch();
   const { userData, setUserData } = useContext(AuthContext);
   const inpRef = useRef();

   const calcPrice = async (e) => {
      if (e.target.textContent === 'Temporary unavailable' || userData.username === 'Log in') return;
      const personsAmountRef = +inpRef.current.value;
      setPersonsAmount(personsAmountRef);

      if (!personsAmountRef || personsAmountRef < 0) return alert(`Number of people can't be empty or negative`);
      const body = {
         places: personsAmountRef,
         travelID: id,
         userID: userData.id,
      };

      await fetchData('/bookings', 'PATCH', body);
   };

   // wait for fulfilled respond then calc and display updated total price and
   useEffect(() => {
      console.log(`BookingSection effect`);
      if (!ready) return;
      setTotalCost(dataa?.price * personsAmount);
      localStorage.setItem('travel__user', JSON.stringify(data.user));
      setUserData(data.user);
      setBookedButton(true);
   }, [ready]);

   // check if current travel was booked by current user
   useEffect(() => {
      console.log(`component mount`);
      if (!userData?.bookings) return;
      const checkUserSBookings = userData?.bookings.some((value) => value === id);
      if (checkUserSBookings) setBookedButton(true);
   }, []);

   return (
      <aside className='travel-sum'>
         <LoadingSpinner loading={loading} />
         {contextHolder}
         <h3>Book this travel:</h3>
         <label htmlFor='peoples-number'>Choose number of people:</label>
         <div className='group'>
            {/* <FontAwesomeIcon icon='user' className='icon' /> */}
            <i className='icon fa-solid fa-users'></i>
            <input ref={inpRef} disabled={bookedButton} type='number' className='input' placeholder='e.g. 1' />
         </div>
         <div className='destinations-date'>
            {/* <FontAwesomeIcon icon='plane' /> */}
            <i className='fa-solid fa-plane'></i>
            <p>
               {dataa?.startDate} - {dataa?.endDate}
            </p>
         </div>
         <div key={dataa?.id} className='cost-wrapper'>
            <p className='cost'>Cost:</p>
            <p className='destinations-price'>
               {totalCost} $/<span>total</span>
            </p>
            <p className='destinations-price'>
               {dataa?.price} $/<span>per</span>
            </p>
         </div>
         {/* display proper info if user alreay booked travel */}
         {bookedButton ? (
            <div className='booked-message'>
               <p>Travel booked</p>
            </div>
         ) : (
            <button onClick={calcPrice} className={`btn ${!dataa?.availablePlaces || userData.username === 'Log in' ? 'disabled' : ''}`}>
               {!dataa?.availablePlaces ? 'Temporary unavailable' : 'Book'}
            </button>
         )}
      </aside>
   );
};
{
   /* <button onClick={calcPrice} className={`btn ${!data?.availablePlaces || userData.username === 'Log in' ? 'disabled' : ''}`}>
{!data?.availablePlaces ? 'Temporary unavailable' : 'Book'}
</button> */
}
