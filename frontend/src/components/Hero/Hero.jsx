import React from 'react';
import './Hero.css';

export const Hero = () => {
  return (
    <section>
      <video className='hero__video' src='../hero4.mp4' muted loop></video>
      <h1 className='hero__header'>
        Explore the <br /> <span>World</span>
      </h1>
    </section>
  );
};
