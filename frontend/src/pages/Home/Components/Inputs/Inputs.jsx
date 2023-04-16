import React, { useRef } from 'react';
import { DatePicker } from 'antd';
import { PriceInput } from '../PriceInput/PriceInput';
import { Buttons } from '../Buttons/Buttons';
import './Inputs.css';

const { RangePicker } = DatePicker;

export const Inputs = ({ fetchTravelData }) => {
   const cityRef = useRef();
   const priceRef = useRef();
   let userDates;

   // body for fetch request
   const inputData = () => {
      return {
         city: cityRef.current?.value.toLowerCase().trim(),
         price: +priceRef.current?.value,
         startDate: !userDates ? '' : userDates?.[0].format('DD/MM/YYYY'),
         endDate: !userDates ? '' : userDates?.[1].format('DD/MM/YYYY'),
      };
   };

   return (
      <section className='input__wrapper'>
         <form className='inputs__form'>
            <div className='inp__wrapper'>
               <label htmlFor='city'>Search by destination:</label>
               <div className='group'>
                  <i className='icon fa-solid fa-magnifying-glass'></i>
                  <input ref={cityRef} id='city' name='city' type='text' className='input' placeholder='e.g. bali' />
               </div>
            </div>
            <div className='inp__wrapper calendar__wrapper'>
               <label htmlFor='date'>Search by date:</label>
               <RangePicker className='picker' onChange={(values) => (userDates = values)} />
            </div>
            <PriceInput priceRef={priceRef} />
         </form>
         <Buttons fetchTravelData={fetchTravelData} inputData={inputData} />
      </section>
   );
};
