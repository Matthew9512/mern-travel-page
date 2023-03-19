import React from 'react';
import './ErrorFallback.css';

export const ErrorFallback = ({ error }) => {
  return (
    <div className='error__wrapper'>
      <p className='error__message'>Something went wrong: {error.message}</p>
    </div>
  );
};
