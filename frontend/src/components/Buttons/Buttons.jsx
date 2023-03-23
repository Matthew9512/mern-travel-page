import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';

export const Buttons = ({ usersInput }) => {
   const { state, setState } = useContext(GlobalContext);

   const controller = new AbortController();
   const signal = controller.signal;

   // load data from LS or fetch data
   useEffect(() => {
      const lsItems = localStorage.getItem('travel__list') ? JSON.parse(localStorage.getItem('travel__list')) : [];
      lsItems.length === 0 ? fetchData() : setState(lsItems);

      return () => controller.abort();
   }, []);

   // save data in LS
   useEffect(() => {
      localStorage.setItem('travel__list', JSON.stringify(state));
   }, [state]);

   // fetch most popular cat
   const fetchData = async (value) => {
      const fetchOpt = value ? '/search' : '';
      console.log(`fetch`);
      try {
         const res = await fetch(`http://localhost:8000${fetchOpt}`, signal);

         const data = await res.json();
         setState(data);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className='btns'>
         <button onClick={usersInput} className='btn btn-save'>
            Search
         </button>
         <p>or</p>
         <button onClick={() => fetchData(true)} className='btn btn-save'>
            See full offer
         </button>
      </div>
   );
};
