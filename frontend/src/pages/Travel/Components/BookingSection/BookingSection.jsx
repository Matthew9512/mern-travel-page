import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useAxios } from '../../../../api/useAxios';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner';
import { FontAwesome } from '../../../../utils/icons';
import './BookingSection.css';

export const BookingSection = ({ travelData }) => {
   const { userData, setUserData } = useContext(AuthContext);
   const [personsAmount, setPersonsAmount] = useState(1);
   const [totalCost, setTotalCost] = useState(travelData?.price);
   const { fetchData, loading, ready, contextHolder } = useAxios(true);
   const inpRef = useRef();
   const [bookedButton, setBookedButton] = useState(false);

   // check if current travel was booked by current user
   useEffect(() => {
      const check = userData?.bookings.some((value) => value === travelData._id);
      if (!check) setBookedButton(false);
      else setBookedButton(true);
   }, [userData]);

   const calcPrice = async () => {
      if (!userData) return;
      const personsAmountRef = +inpRef.current.value;
      setPersonsAmount(personsAmountRef);

      if (!personsAmountRef || personsAmountRef < 0) return alert(`Number of people can't be empty or negative`);

      await fetchData({
         method: `PATCH`,
         url: `/bookings`,
         data: {
            places: personsAmountRef,
            travelID: travelData._id,
            userID: userData._id,
         },
      });
   };

   // wait for fulfilled respond then calc and display updated total price and
   useEffect(() => {
      if (!ready) return;
      setTotalCost(travelData?.price * personsAmount);
      setBookedButton(true);
      setUserData((prev) => {
         return { ...prev, 'prev.bookings': prev?.bookings.push(travelData._id) };
      });
   }, [ready]);

   return (
      <aside className='travel-sum'>
         <LoadingSpinner loading={loading} />
         {contextHolder}
         <h3>Book this travel:</h3>
         <label htmlFor='peoples-number'>Choose number of people:</label>
         <div className='group'>
            <FontAwesome iconName='user' classType='icon' />
            <input
               ref={inpRef}
               disabled={bookedButton || !userData?.username}
               type='number'
               className='input'
               placeholder='e.g. 1'
            />
         </div>
         <div className='destinations-date'>
            <FontAwesome iconName='plane' />
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
            <button
               onClick={calcPrice}
               className={`btn ${!travelData?.availablePlaces || !userData ? 'disabled' : ''}`}
            >
               {!travelData?.availablePlaces ? 'Temporary unavailable' : 'Book'}
            </button>
         )}
      </aside>
   );
};
