import React, { useRef, useState } from 'react';
import './Login.css';

export const Login = () => {
   const [auth, setAuth] = useState(true);
   const usernameRef = useRef();
   const passwordRef = useRef();

   const setting = {
      header: auth ? 'Log in to' : 'Sign up',
      btn: auth ? 'Log in' : 'Sign up',
      footer: auth ? `Don't have an account? ` : `Have an account? `,
      footerBtn: auth ? 'Sign Up' : 'Log in',
      // inputUsername: auth ? (usernameRef.current.value = '') : '',
      // inputPassword: auth ? (passwordRef.current.value = '') : '',
   };

   const loginIn = async () => {
      const endpoint = auth ? 'login' : 'signin';
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
      const resData = await res.json();
      console.log(resData);
      if (res.status === 200) localStorage.setItem('user', JSON.stringify(usernameRef.current.value));

      usernameRef.current.value = '';
      passwordRef.current.value = '';
   };

   return (
      <div className='login'>
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
            <span onClick={() => setAuth((prev) => !prev)} className='signin-span'>
               {setting.footerBtn}
            </span>
         </p>
      </div>
   );
};
