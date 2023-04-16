import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const UserPageNav = () => {
   const { pathname } = useLocation();

   return (
      <div className='user__panel-btns'>
         <Link to={'/user'} className={`btn ${pathname === '/user' ? 'current-page' : ''}`}>
            My profile
         </Link>
         <Link to={'/user/bookings'} className={`btn ${pathname === '/user/bookings' ? 'current-page' : ''}`}>
            My bookings
         </Link>
      </div>
   );
};
