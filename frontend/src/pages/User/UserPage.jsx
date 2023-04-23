import React, { useContext } from 'react';
import './UserPage.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserPageNav } from './Components/UserPageNav/UserPageNav';

export const UserPage = () => {
   const { userData, setAuth } = useContext(AuthContext);
   const navigate = useNavigate();

   const logOut = () => {
      // go back to previous page
      navigate(-1);
      localStorage.removeItem('travel__user');
      setAuth('Log in');
   };

   return (
      <section className='user__panel'>
         <UserPageNav />
         <div className='user__bookings'>
            <p>username: {userData.username}</p>
            <p>active email: {userData.email}</p>
            <p>joined: {userData.createdAt}</p>
            <button onClick={logOut} className='btn'>
               Log Out
            </button>
         </div>
      </section>
   );
};
