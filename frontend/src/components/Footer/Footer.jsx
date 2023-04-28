import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';

export const Footer = () => {
   return (
      <footer className='footer'>
         <div className='footer__media-icons'>
            <a href='https://github.com/' target='_blank'>
               {/* <FontAwesomeIcon icon={['fab', 'github']} /> */}
               <i className='fa-brands fa-github'></i>
            </a>
            <a href='https://pl.linkedin.com/' target='_blank'>
               {/* <FontAwesomeIcon icon={['fab', 'linkedin']} /> */}
               <i className='fa-brands fa-linkedin'></i>
            </a>
         </div>
         <p>&copy; 2023 by Matthew, All right reserved.</p>
      </footer>
   );
};
