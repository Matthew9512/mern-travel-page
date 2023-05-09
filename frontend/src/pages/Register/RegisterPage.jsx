import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAxios } from '../../api/useAxios';
import { FontAwesome } from '../../utils/icons';
import '../Login/LoginPage';

export const RegisterPage = () => {
   const usernameRef = useRef();
   const passwordRef = useRef();
   const emailRef = useRef();
   const { fetchData, ready, contextHolder } = useAxios();
   const navigate = useNavigate();

   const authUser = async (e) => {
      e.preventDefault();

      if (usernameRef.current?.value.length < 3 || passwordRef.current?.value.length < 3 || !emailRef.current.value) return;

      // register new user
      await fetchData({
         method: `POST`,
         url: `/user/signin`,
         data: { email: emailRef.current?.value, username: usernameRef.current?.value, password: passwordRef.current?.value },
      });
   };

   useEffect(() => {
      if (!ready) return;
      // navigate after message ends
      setTimeout(() => {
         navigate('/login');
      }, 1500);

      // clear inp here after created user
   }, [ready]);

   return (
      <div className='auth__container'>
         <video className='hero__video' src='../public/hero4.mp4' muted loop></video>
         <div className='login'>
            {contextHolder}
            <p className='auth__header'>
               <span>
                  <FontAwesome iconName='earth-americas' />
               </span>
               Travello
            </p>
            <p>Sign up your account</p>
            <form className='login__wrapper'>
               <label htmlFor='emailRef'>Email:</label>
               <input ref={emailRef} type='email' id='emailRef' />
               <label htmlFor='username'>Username:</label>
               <input ref={usernameRef} type='text' id='username' minLength={3} />
               <label htmlFor='password'>Password:</label>
               <input ref={passwordRef} type='password' id='password' minLength={3} />
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
