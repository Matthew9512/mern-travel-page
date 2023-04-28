import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LoadingButton = () => {
   return (
      <span className='loading-button'>
         {/* <FontAwesomeIcon icon='circle-notch' spin />
         Loading... */}
         <i className='fa-solid fa-circle-notch fa-spin'></i> Loading...
      </span>
   );
};
