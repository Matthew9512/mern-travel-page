import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { useGetFetch } from '../../hooks/useFetchConfig';

export const Buttons = ({ takeInputData }) => {
   const { state, setState } = useContext(GlobalContext);

   const fetchData = useGetFetch();

   // load data from LS or fetch data
   useEffect(() => {
      const controller = new AbortController();

      const lsItems = localStorage.getItem('travel__list') ? JSON.parse(localStorage.getItem('travel__list')) : [];
      lsItems.length === 0 ? fetchData() : setState(lsItems);

      return () => controller.abort();
   }, []);

   // save data in LS
   useEffect(() => {
      localStorage.setItem('travel__list', JSON.stringify(state));
   }, [state]);

   return (
      <div className='btns'>
         <button onClick={takeInputData} className='btn btn-save'>
            Search
         </button>
         <p>or</p>
         <button onClick={() => fetchData(true)} className='btn btn-save'>
            See full offer
         </button>
      </div>
   );
};
