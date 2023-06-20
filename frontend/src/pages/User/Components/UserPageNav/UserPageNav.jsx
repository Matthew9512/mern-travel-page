import { Link, useLocation } from 'react-router-dom';

export const UserPageNav = () => {
   const { pathname } = useLocation();

   return (
      <div className='user__panel-btns'>
         <Link to='/user' className={`user-panel-btn  ${pathname === '/user' ? 'current-page' : ''}`}>
            My profile
         </Link>
         <Link to='/user/bookings' className={`user-panel-btn  ${pathname === '/user/bookings' ? 'current-page' : ''}`}>
            My bookings
         </Link>
      </div>
   );
};
