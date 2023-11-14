import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesome } from '../../utils/icons';
import { LoadingButton } from '../LoadingButton';
import './Navbar.css';

export const Navbar = () => {
   const { userData, loading } = useContext(AuthContext);
   const navigate = useNavigate();
   const pathname = location.pathname;
   const navBtn = useRef();
   const navRef = useRef();
   const [navbarVis, setNavbarVis] = useState(false);

   const handleAuth = () => (!userData ? navigate('/login') : navigate('/user'));

   // toggle navbar visibility
   const toggleNavbar = (e) => {
      const click = e.target;
      if (navBtn.current.contains(click)) setNavbarVis((prev) => !prev);
      if (click.classList.contains('navbar__btn')) setNavbarVis(false);
   };

   // toggle nav menu vis when user clicks outside of nav menu when menu is vis
   useEffect(() => {
      if (!navbarVis) return;
      const handleOusideClick = (e) => {
         if (!navRef.current.contains(e.target)) setNavbarVis(false);
      };

      document.addEventListener('click', handleOusideClick);

      return () => document.removeEventListener('click', handleOusideClick);
   }, [navbarVis]);

   return (
      <nav ref={navRef} onClick={toggleNavbar} className='navbar'>
         <div className=''>
            <a href='/'>
               <button className='navbar__btn'>
                  <FontAwesome iconName='earth-americas' classType='navbar__logo' />
               </button>
            </a>
         </div>
         <input type='checkbox' id='navbar-check' />
         <div className='navbar__btn-wrapper'>
            <label ref={navBtn} htmlFor='navbar-check'>
               <span></span>
               <span></span>
               <span></span>
            </label>
         </div>
         <ul className={`navbar__items-wrapper ${navbarVis ? 'show' : 'hide'}`}>
            <li>
               <a href={pathname === '/' ? '#start' : '/'}>
                  <button className='navbar__btn'>Start</button>
               </a>
            </li>
            <li>
               <a href={pathname === '/' ? '#offer' : '/'}>
                  <button className='navbar__btn'>Offer</button>
               </a>
            </li>
            <li>
               {loading ? (
                  <LoadingButton />
               ) : (
                  <button onClick={handleAuth} className='navbar__btn'>
                     {!userData ? 'Log in' : userData?.username} <FontAwesome iconName='user' />
                  </button>
               )}
            </li>
         </ul>
      </nav>
   );
};
