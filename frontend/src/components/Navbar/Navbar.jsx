import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <i className='fa-brands fa-joomla navbar__logo'></i>
      <input id='menu-toggle' type='checkbox' />
      <label className='navbar__menu-button-container' htmlFor='menu-toggle'>
        <div className='navbar__menu-button'></div>
      </label>
      <ul className='navbar__menu'>
        <li>
          <a href='#about'>
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
      </ul>
    </nav>
  );
};
