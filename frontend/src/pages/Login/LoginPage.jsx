import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useAxios } from '../../api/useAxios';
import { FontAwesome } from '../../utils/icons';
import './LoginPage.css';
import '../../assets/App.css';

export const LoginPage = () => {
   const emailRef = useRef();
   const passwordRef = useRef();
   const { setFetchUser } = useContext(AuthContext);
   const { fetchData, data, ready, contextHolder } = useAxios();

   const navigate = useNavigate();

   const authUser = async (e) => {
      e.preventDefault();

      if (passwordRef.current?.value.length < 3 || !emailRef.current.value) return;

      await fetchData({
         method: `POST`,
         url: `/user/login`,
         data: { email: emailRef.current?.value, password: passwordRef.current?.value },
      });
   };

   // wait for fulfilled respond then save user in ls and change auth user state
   useEffect(() => {
      if (!ready) return;
      const accessToken = JSON.stringify(data.accessToken);
      localStorage.setItem('access__token', accessToken);
      setFetchUser(data.accessToken);
      navigate('/');
   }, [ready]);

   return (
      <div className='auth__container'>
         {contextHolder}
         <video className='hero__video' src='../public/hero4.mp4' muted loop></video>
         <div className='login'>
            <p className='auth__header'>
               <span>
                  <FontAwesome iconName='earth-americas' />
               </span>
               Travello
            </p>
            <p>Log into your account</p>
            <form className='login__wrapper'>
               <label htmlFor='email'>Email:</label>
               <input ref={emailRef} type='email' id='email' />
               <label htmlFor='password'>Password:</label>
               <input ref={passwordRef} type='password' id='password' minLength={3} />
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
