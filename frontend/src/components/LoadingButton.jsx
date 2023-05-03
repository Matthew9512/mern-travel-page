import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const LoadingButton = () => {
   return (
      <span className='loading-button'>
         <span className='spinner'></span> Loading...
         {/* <FontAwesome iconName='circle-notch' spin /> Loading... */}
         {/* <FontAwesomeIcon icon='circle-notch' spin />
         Loading... */}
         {/* <i className='fa-solid fa-circle-notch fa-spin'></i> Loading... */}
      </span>
   );
};
