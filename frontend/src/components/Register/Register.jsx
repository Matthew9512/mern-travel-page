import React from 'react';

export const Register = ({ setLogin }) => {
   const usernameRef = useRef();
   const passwordRef = useRef();

   return (
      <div className='login'>
         {contextHolder}
         <p className='auth__header'>
            <span>
               <i className='fa-solid fa-earth-americas'></i>
            </span>
            Travello
         </p>
         <p>Log in your account</p>
         <form className='login__wrapper'>
            <label htmlFor='username'>Username:</label>
            <input ref={usernameRef} type='text' id='username' />
            <label htmlFor='password'>Password:</label>
            <input ref={passwordRef} type='password' id='password' />
            <button onClick={(e) => logIn(e)} className='btn auth-btn'>
               Log In
            </button>
         </form>
         <p>
            Have an account?{' '}
            <button onClick={() => setLogin(true)} className='signin-span'>
               Log In
            </button>
         </p>
      </div>
   );
};
