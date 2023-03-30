import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookTravel } from '../../hooks/useFetchConfig';
import './PlacesItemAside.css';

export const PlacesItemAside = ({ data }) => {
   // if (!data) return <p>loading....</p>;

   const [totalCost, setTotalCost] = useState(data?.price);
   const [personCost, setPersonCost] = useState(data?.price);

   const { id } = useParams();
   const inpRef = useRef();

   const calcPrice = async () => {
      const personsAmount = +inpRef.current.value;

      if (!personsAmount) return alert(`Number of people can't be empty`);

      const { book, res } = await bookTravel(id, inpRef);
      if (res.status !== 200) return;
      else {
         if (!personsAmount) {
            setTotalCost(data);
            setPersonCost(data);
         }
         if (personsAmount === 1) {
            setTotalCost(data * personsAmount);
            setPersonCost(data * personsAmount);
         } else {
            setTotalCost(data * personsAmount);
            setPersonCost((data * personsAmount) / 2);
         }
      }
   };

   return (
      <aside className='travel-sum'>
         <label htmlFor='peoples-number'>Number of people:</label>
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
               {personCost} $/<span>per</span>
            </p>
         </div>
         <button onClick={calcPrice} className='btn'>
            Book
         </button>
      </aside>
   );
};
