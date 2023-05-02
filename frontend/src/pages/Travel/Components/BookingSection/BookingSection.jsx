import React, { useContext, useEffect, useRef, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BookingSection.css';
import { AuthContext } from '../../../../context/AuthContext';
import { useFetch } from '../../../../api/useFetch';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner';
import { FontAwesome } from '../../../../utils/icons';

export const BookingSection = ({ travelData, id }) => {
   const [personsAmount, setPersonsAmount] = useState(1);
   const [totalCost, setTotalCost] = useState(travelData?.price);
   const { userData, setUserData } = useContext(AuthContext);

   const [bookedButton, setBookedButton] = useState(() => {
      // check if current travel was booked by current user
      if (userData.at(0)?.bookings.some((value) => value == id)) return true;
      return false;
   });
   const { fetchData, data, loading, ready, contextHolder } = useFetch();
   const inpRef = useRef();

   const calcPrice = async () => {
      if (!userData.length) return;
      // if (e.target.textContent === 'Temporary unavailable' || !userData.length) return;
      const personsAmountRef = +inpRef.current.value;
      setPersonsAmount(personsAmountRef);

      if (!personsAmountRef || personsAmountRef < 0) return alert(`Number of people can't be empty or negative`);
      const body = {
         places: personsAmountRef,
         travelID: id,
         userID: userData.at(0).id,
      };
      await fetchData('/bookings', 'PATCH', body);
   };

   // wait for fulfilled respond then calc and display updated total price and
   useEffect(() => {
      console.log(`BookingSection effect`);
      if (!ready) return;
      setTotalCost(travelData?.price * personsAmount);
      localStorage.removeItem('travel__user');
      setUserData([data.user]);
      setBookedButton('Travel booked');
   }, [ready]);

   return (
      <aside className='travel-sum'>
         <LoadingSpinner loading={loading} />
         {contextHolder}
         <h3>Book this travel:</h3>
         <label htmlFor='peoples-number'>Choose number of people:</label>
         <div className='group'>
            <FontAwesome iconName='user' classType='icon' />
            {/* <FontAwesomeIcon icon='user' className='icon' /> */}
            {/* <i className='icon fa-solid fa-users'></i> */}
            <input ref={inpRef} disabled={bookedButton} type='number' className='input' placeholder='e.g. 1' />
         </div>
         <div className='destinations-date'>
            <FontAwesome iconName='plane' />
            {/* <FontAwesomeIcon icon='plane' /> */}
            {/* <i className='fa-solid fa-plane'></i> */}
            <p>
               {travelData?.startDate} - {travelData?.endDate}
            </p>
         </div>
         <div key={travelData?.id} className='cost-wrapper'>
            <p className='cost'>Cost:</p>
            <p className='destinations-price'>
               {totalCost} $/<span>total</span>
            </p>
            <p className='destinations-price'>
               {travelData?.price} $/<span>per</span>
            </p>
         </div>
         {/* display proper info if user alreay booked travel */}
         {bookedButton ? (
            <div className='booked-message'>
               <p>Travel booked</p>
            </div>
         ) : (
            <button onClick={calcPrice} className={`btn ${!travelData?.availablePlaces || !userData.length ? 'disabled' : ''}`}>
               {!travelData?.availablePlaces ? 'Temporary unavailable' : 'Book'}
            </button>
         )}
      </aside>
   );
};
