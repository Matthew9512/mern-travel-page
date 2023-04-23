import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner = ({ loading }) => {
   return (
      <div className={`loading__wrapper ${loading ? '' : 'hidden'}`}>
         <span className='spinner'></span>
      </div>
   );
};
