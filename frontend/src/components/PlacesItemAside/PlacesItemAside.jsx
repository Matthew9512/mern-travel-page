import React, { useContext, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookTravel } from '../../hooks/useFetchConfig';
import './PlacesItemAside.css';
import { AuthContext } from '../../context/AuthContext';

export const PlacesItemAside = ({ data }) => {
   console.log(data);
   const [totalCost, setTotalCost] = useState(data?.price);
   const { booking, contextHolder, calc } = bookTravel();
   const { auth } = useContext(AuthContext);

   const { id } = useParams();
   const inpRef = useRef();

   const calcPrice = async (e) => {
      if (e.target.textContent === 'Temporary unavailable' || auth === 'Log in') return;

      const personsAmount = +inpRef.current.value;

      if (!personsAmount || personsAmount < 0) return alert(`Number of people can't be empty or negative`);

      await booking(id, inpRef);

      if (calc) return;

      setTotalCost(data?.price * personsAmount);
   };

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
         <button onClick={(e) => calcPrice(e)} className={`btn ${!data?.availablePlaces || auth === 'Log in' ? 'disabled' : ''}`}>
            {!data?.availablePlaces ? 'Temporary unavailable' : 'Book'}
         </button>
      </aside>
   );
};
