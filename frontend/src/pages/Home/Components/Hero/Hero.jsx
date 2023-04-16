import React from 'react';
import './Hero.css';

export const Hero = () => {
   return (
      <section className='hero'>
         <video className={'hero__video'} src='../hero4.mp4' muted loop></video>
         <h1 className={'hero__header'}>
            Explore the <br />
            <span>
               W
               <span>
                  <i className='fa-solid fa-earth-americas hero__logo'></i>
               </span>
               rld
            </span>
         </h1>
      </section>
   );
};
