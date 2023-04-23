import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { useFetch } from '../../api/useFetch';
import { AuthContext } from '../../context/AuthContext';

export const LoginPage = () => {
   const emailRef = useRef();
   const passwordRef = useRef();
   const { setAuth } = useContext(AuthContext);
   const navigate = useNavigate();

   const { fetchData, data, ready, contextHolder } = useFetch();

   const authUser = async (e) => {
      e.preventDefault();

      const body = {
         email: emailRef.current?.value,
         password: passwordRef.current?.value,
      };

      // get user data
      await fetchData(`/user/login`, 'POST', body);
   };

   // wait for fulfilled respond then save user in ls and change auth user state
   useEffect(() => {
      if (ready) {
         console.log(`user effect`);
         setAuth(data.user.username);
         localStorage.setItem('travel__user', JSON.stringify(data.user));
         alert(`user login successfully, welcome back ${data.user.username}`);
         // go back to previous page
         navigate(-1);
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
            <p>Log into your account</p>
            <form className='login__wrapper'>
               <label htmlFor='email'>Email:</label>
               <input ref={emailRef} type='text' id='email' />
               <label htmlFor='password'>Password:</label>
               <input ref={passwordRef} type='password' id='password' />
               <button onClick={authUser} className='btn auth-btn'>
                  Log in
               </button>
            </form>
            <Link to={'/signin'}>
               <p>
                  Don't have an account?
                  <span className='signin-span'>Sign Up</span>
               </p>
            </Link>
         </div>
      </div>
   );
};
