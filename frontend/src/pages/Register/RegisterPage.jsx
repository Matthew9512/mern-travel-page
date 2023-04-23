import React, { useRef } from 'react';
import '../Login/LoginPage';
import { useFetch } from '../../api/useFetch';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
   const usernameRef = useRef();
   const passwordRef = useRef();
   const emailRef = useRef();

   const { fetchData, contextHolder } = useFetch();

   const authUser = async (e) => {
      e.preventDefault();

      const email = emailRef.current?.value;
      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) alert`wrong mail`;

      const body = {
         email,
         username: usernameRef.current?.value,
         password: passwordRef.current?.value,
      };

      // register new user
      await fetchData(`/user/signin`, 'POST', body);
   };

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
            <p>Sign up your account</p>
            <form className='login__wrapper'>
               <label htmlFor='emailRef'>Email:</label>
               <input ref={emailRef} type='text' id='emailRef' />
               <label htmlFor='username'>Username:</label>
               <input ref={usernameRef} type='text' id='username' />
               <label htmlFor='password'>Password:</label>
               <input ref={passwordRef} type='password' id='password' />
               <button onClick={authUser} className='btn auth-btn'>
                  Sign up
               </button>
            </form>
            <Link to={'/login'}>
               <p>
                  Have an account?
                  <span className='signin-span'>Log in</span>
               </p>
            </Link>
         </div>
      </div>
   );
};
