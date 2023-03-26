import React, { useContext, useRef, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { usePopupMessage } from '../../hooks/usePopupMessage';

export const Login = () => {
   const { setAuth } = useContext(AuthContext);

   const [login, setLogin] = useState(true);

   const usernameRef = useRef();
   const passwordRef = useRef();
   const navigate = useNavigate();

   const { contextHolder, success, error } = usePopupMessage();

   const setting = {
      header: login ? 'Log in to' : 'Sign up',
      btn: login ? 'Log in' : 'Sign up',
      footer: login ? `Don't have an account? ` : `Have an account? `,
      footerBtn: login ? 'Sign Up' : 'Log in',
   };

   const loginIn = async () => {
      try {
         const endpoint = login ? 'login' : 'signin';
         const res = await fetch(`http://localhost:8000/users/${endpoint}`, {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               username: usernameRef.current.value,
               password: passwordRef.current.value,
            }),
         });
         const data = await res.json();
         console.log(data);
         if (res.status === 200) {
            success(data.message);
            setTimeout(() => {
               setAuth(usernameRef.current.value);
               navigate('/');
            }, 1000);
         } else throw new Error(data.message);
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }

      usernameRef.current.value = '';
      passwordRef.current.value = '';
   };

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
         <div className='login__wrapper'>
            <label htmlFor='username'>Username:</label>
            <input ref={usernameRef} type='text' id='username' defaultValue={setting.inputUsername} />
            <label htmlFor='password'>Password:</label>
            <input ref={passwordRef} type='password' id='password' defaultValue={setting.inputPassword} />
            <button onClick={loginIn} className='auth-btn'>
               {setting.btn}
            </button>
         </div>
         <p>
            {setting.footer}
            <span onClick={() => setLogin((prev) => !prev)} className='signin-span'>
               {setting.footerBtn}
            </span>
         </p>
      </div>
   );
};
