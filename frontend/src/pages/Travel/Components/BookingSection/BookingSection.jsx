import React, { useContext, useEffect, useRef, useState } from 'react';
import './BookingSection.css';
import { AuthContext } from '../../../../context/AuthContext';
import { useFetch } from '../../../../api/useFetch';

export const BookingSection = ({ data, id }) => {
   const [personsAmount, setPersonsAmount] = useState(1);
   const [totalCost, setTotalCost] = useState(data?.price);
   const { fetchData, ready, contextHolder } = useFetch();
   const { auth } = useContext(AuthContext);
   const inpRef = useRef();

   const calcPrice = async (e) => {
      if (e.target.textContent === 'Temporary unavailable' || auth === 'Log in') return;

      const personsAmountRef = +inpRef.current.value;

      setPersonsAmount(personsAmountRef);

      if (!personsAmountRef || personsAmountRef < 0) return alert(`Number of people can't be empty or negative`);

      const body = {
         places: personsAmountRef,
         id,
      };

      await fetchData('/places', 'PATCH', body);
   };

   // wait for fulfilled respond then calc and display updated total price
   useEffect(() => {
      console.log(`BookingSection effect`);
      if (ready) setTotalCost(data?.price * personsAmount);
   }, [ready]);

   return (
      <aside className='travel-sum'>
         {contextHolder}
         <h3>Book this travel:</h3>
         <label htmlFor='peoples-number'>Choose number of people:</label>
         <div className='group'>
            <i className='icon fa-solid fa-users'></i>
            <input ref={inpRef} type='number' className='input' placeholder='e.g. 1' />
         </div>
         <div className='destinations-date'>
            <i className='fa-solid fa-plane'></i>
            <p>
               {data?.startDate} - {data?.endDate}
            </p>
         </div>
         <div key={data?.id} className='cost-wrapper'>
            <p className='cost'>Cost:</p>
            <p className='destinations-price'>
               {totalCost} $/<span>total</span>
            </p>
            <p className='destinations-price'>
               {data?.price} $/<span>per</span>
            </p>
         </div>
         <button onClick={calcPrice} className={`btn ${!data?.availablePlaces || auth === 'Log in' ? 'disabled' : ''}`}>
            {!data?.availablePlaces ? 'Temporary unavailable' : 'Book'}
         </button>
      </aside>
   );
};
