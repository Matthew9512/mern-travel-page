import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

export const Navbar = () => {
   // const [show, setShow] = useState(false);
   const { auth } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleAuth = () => {
      if (auth !== 'Log in') navigate('/user');
      else navigate('/login');
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
// ============================================
// const toggleNavbar = (e) => {
//    const click = e.target;
//    if (click.classList.contains('navbar__btn')) setShow((prev) => !prev);
// };

// return (
//    <>
//       <button onClick={() => setShow((prev) => !prev)} className='button btn-close'>
//          X
//       </button>
//       <nav className={`navbar ${!show ? 'hide' : 'show'}`}>
//          <i className='fa-solid fa-earth-americas navbar__logo'></i>
//          <ul onClick={toggleNavbar} className='navbar__menu'>
//             <li>
//                <a href='/'>
//                   <button className='navbar__btn'>Start</button>
//                </a>
//             </li>
//             <li>
//                <a href='#contact'>
//                   <button className='navbar__btn'>Contact</button>
//                </a>
//             </li>
//             <li>
//                <a href='#contact'>
//                   <button className='navbar__btn'>About</button>
//                </a>
//             </li>
//             <li>
//                <button onClick={handleAuth} className='navbar__btn'>
//                   {auth}
//                </button>
//             </li>
//          </ul>
//       </nav>
//    </>
// )
