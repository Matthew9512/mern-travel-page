import React, { useRef } from 'react';
import './Login.css';
import { authUser } from '../../hooks/useFetchConfig';

export const Login = () => {
   const usernameRef = useRef();
   const passwordRef = useRef();

   const { logIn, setting, setLogin, contextHolder } = authUser(usernameRef, passwordRef);

   return (
      <div className='login'>
         {contextHolder}
         <p className='auth__header'>
            <span>
               <i className='fa-solid fa-earth-americas'></i>
            </span>
            Travello
         </p>
         <p>{setting.header} your account</p>
         <form className='login__wrapper'>
            <label htmlFor='username'>Username:</label>
            <input ref={usernameRef} type='text' id='username' />
            <label htmlFor='password'>Password:</label>
            <input ref={passwordRef} type='password' id='password' />
            <button onClick={(e) => logIn(e)} className='btn auth-btn'>
               {setting.btn}
            </button>
         </form>
         <p>
            {setting.footer}
            <span onClick={() => setLogin((prev) => !prev)} className='signin-span'>
               {setting.footerBtn}
            </span>
         </p>
      </div>
   );
};
