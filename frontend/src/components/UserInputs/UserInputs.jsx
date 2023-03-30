import './UserInputs.css';
import React, { useRef } from 'react';
import { _reducerActions } from '../../reducer/reducer';
import { InputRange } from '../InputRange/InputRange';
import { Buttons } from '../Buttons/Buttons';
import { DatePicker } from 'antd';
import { fetchInputData } from '../../hooks/useFetchConfig';

const { RangePicker } = DatePicker;

export const UserInputs = () => {
   const cityRef = useRef();
   const priceRef = useRef();
   let userDates;

   const getUsersInput = fetchInputData();

   const takeInputData = () => {
      // document.querySelector('.destinations__header').scrollIntoView();
      getUsersInput(cityRef, priceRef, userDates);
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
            <InputRange priceRef={priceRef} />
         </form>
         <Buttons takeInputData={takeInputData} />
      </section>
   );
};
