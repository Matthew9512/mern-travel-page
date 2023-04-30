import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesome } from '../utils/icons';

export const LoadingButton = () => {
   return (
      <span className='loading-button'>
         <FontAwesome iconName='circle-notch' spin /> Loading...
         {/* <FontAwesomeIcon icon='circle-notch' spin />
         Loading... */}
         {/* <i className='fa-solid fa-circle-notch fa-spin'></i> Loading... */}
      </span>
   );
};
