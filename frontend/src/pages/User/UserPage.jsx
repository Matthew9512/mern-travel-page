import React, { useContext } from 'react';
import './UserPage.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserPageNav } from './Components/UserPageNav/UserPageNav';

export const UserPage = () => {
   const { userData } = useContext(AuthContext);
   const navigate = useNavigate();

   const logOut = () => {
      localStorage.removeItem('travel__user');
      navigate('/');
   };

   return (
      <section className='user__panel'>
         <UserPageNav />
         <div className='user__bookings'>
            <p>username: {userData.username}</p>
            <p>joined: {userData.createdAt}</p>
            <button onClick={logOut} className='btn'>
               Log Out
            </button>
         </div>
      </section>
   );
};
