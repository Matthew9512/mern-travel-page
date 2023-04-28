import React from 'react';
import './PopupMessage.css';

export const PopupMessage = ({ ready, error }) => {
   const successMsg = (
      <span>
         <i class='fa-solid fa-circle-check success'></i> good
      </span>
   );
   const errorMsg = (
      <span>
         <i class='fa-solid fa-circle-xmark error'></i> wrong
      </span>
   );

   return (
      <div className={`popup__wrapper ${ready || error ? 'add' : ''} `}>
         <div className='popup__box'>{ready ? successMsg : errorMsg}</div>
      </div>
   );
};
