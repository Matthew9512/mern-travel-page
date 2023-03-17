import './UserInputs.css';
import React, { useContext, useRef } from 'react';
import { _reducerActions } from '../../reducer/reducer';
import { InputRange } from '../InputRange/InputRange';
import { Buttons } from '../Buttons/Buttons';
import { GlobalContext } from '../../context/GlobalContext';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export const UserInputs = () => {
  const { setState } = useContext(GlobalContext);

  const cityRef = useRef();
  const priceRef = useRef();
  let userDates;

  //   fetch data based on users input
  const usersInput = async () => {
    const values = {
      city: cityRef.current.value.toLowerCase().trim(),
      price: +priceRef.current.value,
      startDate: !userDates ? '' : userDates?.[0].format('YYYY-MM-DD'),
      endDate: !userDates ? '' : userDates?.[1].format('YYYY-MM-DD'),

      // startDate: 'dd/MM/yyyy' ? '' : dateRef.current.target.innerText.slice(0, 10),
      // endDate: 'dd/MM/yyyy' ? '' : dateRef.current.target.innerText.slice(13, 23),
    };
    console.log(values);

    try {
      const res = await fetch(
        `http://localhost:8000/q?price=${values.price}&startDate=${values.startDate}&endDate=${values.endDate}&city=${values.city}`
      );
      const data = await res.json();
      console.log(data);
      if (!data.length) throw new Error(`Sorry we couldn't find anything that matches your question ;( `);
      setState(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className='input__wrapper'>
      <form className='inputs__form'>
        <div className='inp__wrapper'>
          <label htmlFor='city'>Search by destination:</label>
          <div className='group'>
            <svg className='icon' aria-hidden='true' viewBox='0 0 24 24'>
              <g>
                <path d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'></path>
              </g>
            </svg>
            <input ref={cityRef} id='city' name='city' type='text' className='input' placeholder='e.g. bali' />
          </div>
        </div>
        <div className='inp__wrapper calendar__wrapper'>
          <label htmlFor='date'>Search by date:</label>
          <RangePicker className='picker' onChange={(values) => (userDates = values)} />
        </div>
        <InputRange priceRef={priceRef} />
      </form>
      <Buttons usersInput={usersInput} />
    </section>
  );
};
