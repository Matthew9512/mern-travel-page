import React from 'react';
import { Login } from '../components/Login/Login';

export const Auth = () => {
   return (
      <div className='auth__container'>
         <video className='hero__video' src='../hero4.mp4' muted loop></video>
         <Login />
      </div>
   );
};
