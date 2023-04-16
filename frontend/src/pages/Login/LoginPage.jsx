import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useFetch } from '../../api/useFetch';
import { AuthContext } from '../../context/AuthContext';

/**
 * @todo split to login and signin
 */

export const LoginPage = () => {
   const usernameRef = useRef();
   const passwordRef = useRef();
   const [login, setLogin] = useState(true);
   const { setAuth } = useContext(AuthContext);
   const navigate = useNavigate();

   // display proper text for login or signin form
   const setting = {
      header: login ? 'Log into' : 'Sign up',
      btn: login ? 'Log in' : 'Sign up',
      footer: login ? `Don't have an account? ` : `Have an account? `,
      footerBtn: login ? 'Sign Up' : 'Log in',
   };

   const { fetchData, data, ready, contextHolder } = useFetch();

   const authUser = async (e) => {
      e.preventDefault();
      const endpoint = login ? 'login' : 'signin';

      const body = {
         username: usernameRef.current?.value,
         password: passwordRef.current?.value,
      };

      // get user data
      await fetchData(`/user/${endpoint}`, 'POST', body);
   };

   // wait for fulfilled respond then save user in ls and change auth user state
   useEffect(() => {
      if (ready) {
         console.log(`user effect`);
         setAuth(data.user.username);
         localStorage.setItem('travel__user', JSON.stringify(data.user));
         alert(`user login successfully, welcome back ${data.user.username}`);
         navigate('/');
      }
   }, [ready]);

   return (
      <div className='auth__container'>
         <video className='hero__video' src='../hero4.mp4' muted loop></video>
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
               <button onClick={(e) => authUser(e)} className='btn auth-btn'>
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
      </div>
   );
};
