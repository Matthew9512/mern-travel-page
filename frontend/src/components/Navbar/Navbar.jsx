import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Navbar = () => {
   const { userData } = useContext(AuthContext);
   const navigate = useNavigate();
   const navbarBtn = useRef();
   const [navbarVisibility, setNavbarVisibility] = useState(false);

   const handleAuth = () => (!userData.length ? navigate('/login') : navigate('/user'));

   // toggle navbar visibility
   const toggleNavbar = (e) => {
      const click = e.target;
      if (navbarBtn.current.contains(click)) setNavbarVisibility((prev) => !prev);
      if (click.classList.contains('navbar__btn')) setNavbarVisibility(false);
      // else return;
   };

   return (
      <nav onClick={toggleNavbar} className='navbar'>
         <i className='fa-solid fa-earth-americas navbar__logo'></i>
         <input type='checkbox' id='navbar-check' />
         <div className='navbar__btn-wrapper'>
            <label ref={navbarBtn} htmlFor='navbar-check'>
               <span></span>
               <span></span>
               <span></span>
            </label>
         </div>
         <ul className={`navbar__items-wrapper ${navbarVisibility ? 'show' : 'hide'}`}>
            <li>
               <a className='q' href='/'>
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
                  {!userData.length ? 'Log in' : userData.at(0).username} <i className='fa-solid fa-user'></i>
               </button>
            </li>
         </ul>
      </nav>
   );
};

// import React, { useContext, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import './Navbar.css';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export const Navbar = () => {
//    const { auth } = useContext(AuthContext);
//    const navigate = useNavigate();
//    const navbarBtn = useRef();
//    const [navbarVisibility, setNavbarVisibility] = useState(false);

//    const handleAuth = () => {
//       if (auth !== 'Log in') navigate('/user');
//       else navigate('/login');
//    };

//    // toggle navbar visibility
//    const toggleNavbar = (e) => {
//       const click = e.target;
//       if (navbarBtn.current.contains(click)) setNavbarVisibility((prev) => !prev);
//       if (click.classList.contains('navbar__btn')) setNavbarVisibility(false);
//       // else return;
//    };

//    return (
//       <nav onClick={toggleNavbar} className='navbar'>
//          <i className='fa-solid fa-earth-americas navbar__logo'></i>
//          <input type='checkbox' id='navbar-check' />
//          <div className='navbar__btn-wrapper'>
//             <label ref={navbarBtn} htmlFor='navbar-check'>
//                <span></span>
//                <span></span>
//                <span></span>
//             </label>
//          </div>
//          <ul className={`navbar__items-wrapper ${navbarVisibility ? 'show' : 'hide'}`}>
//             <li>
//                <a className='q' href='/'>
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
//                   {auth} <i className='fa-solid fa-user'></i>
//                </button>
//             </li>
//          </ul>
//       </nav>
//    );
// };
