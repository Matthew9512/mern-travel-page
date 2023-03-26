import React, { useState } from 'react';
import '../UserInputs/UserInputs.css';
import { _reducerActions } from '../../reducer/reducer';

export const InputRange = ({ priceRef }) => {
   const [price, setPrice] = useState(9000);

   const handleRangeChange = (e) => setPrice(e.target.value);

   return (
      <div className='inp__wrapper price'>
         <label htmlFor='price'>Select your max price</label>
         <input ref={priceRef} onChange={handleRangeChange} id='price' type='range' min={0} value={price} max={10000} />
      </div>
   );
};
