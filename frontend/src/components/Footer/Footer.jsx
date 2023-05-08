import React from 'react';
import { FontAwesome } from '../../utils/icons';
import './Footer.css';

export const Footer = () => {
   return (
      <footer className='footer'>
         <div className='footer__media-icons'>
            <a href='https://github.com/' target='_blank'>
               <FontAwesome iconName='fa-brands fa-github' classType='fa-brands' />
            </a>
            <a href='https://pl.linkedin.com/' target='_blank'>
               <FontAwesome iconName='fa-brands fa-linkedin' classType='fa-brands' />
            </a>
         </div>
         <p>&copy; 2023 by Matthew, All right reserved.</p>
      </footer>
   );
};
