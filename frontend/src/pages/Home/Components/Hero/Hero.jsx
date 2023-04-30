import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Hero.css';
import { FontAwesome } from '../../../../utils/icons';

export const Hero = () => {
   return (
      <section className='hero'>
         <video className={'hero__video'} src='../hero4.mp4' muted loop></video>
         <h1 className={'hero__header'}>
            Explore the <br />
            <span>
               W
               <span className='hero__logo'>
                  <FontAwesome iconName='earth-americas' className='hero__logo' />
                  {/* <FontAwesomeIcon icon='earth-americas' className='hero__logo' /> */}
                  {/* <i className='fa-solid fa-earth-americas hero__logo'></i> */}
               </span>
               rld
            </span>
         </h1>
      </section>
   );
};
