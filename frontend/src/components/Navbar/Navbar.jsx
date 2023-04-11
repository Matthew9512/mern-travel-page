import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

export const Navbar = () => {
   const { auth, setAuth } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleAuth = (e) => {
      if (e.target.textContent !== 'Log in') {
         // localStorage.removeItem('travel__user');
         // setAuth('Log in');
         navigate('/user');
      } else navigate('/auth');
   };

   return (
      <nav className='navbar'>
         <i className='fa-solid fa-earth-americas navbar__logo'></i>
         <input id='menu-toggle' type='checkbox' />
         <label className='navbar__menu-button-container' htmlFor='menu-toggle'>
            <div className='navbar__menu-button'></div>
         </label>
         <ul className='navbar__menu'>
            <li>
               <a href='/'>
                  <button className='navbar__btn'>Start</button>
               </a>
            </li>
            <li>
               <a href='#contact'>
                  <button className='navbar__btn'>Contact</button>
               </a>
            </li>
            <li>
               <a href='#contact'>
                  <button className='navbar__btn'>About</button>
               </a>
            </li>
            <li>
               <button onClick={handleAuth} className='navbar__btn'>
                  {auth}
               </button>
            </li>
         </ul>
      </nav>
   );
};
