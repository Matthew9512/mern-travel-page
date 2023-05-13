import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserPageNav } from './Components/UserPageNav/UserPageNav';
import { removeToken } from '../../api/jwtAuth';
import './UserPage.css';

export const UserPage = () => {
   const { userData, setUserData } = useContext(AuthContext);
   const navigate = useNavigate();

   const logOut = () => {
      setUserData(null);
      removeToken();
      navigate('/');
   };

   return (
      <section className='user__panel'>
         <UserPageNav />
         <div className='user__bookings'>
            <p>username: {userData?.username}</p>
            <p>active email: {userData?.email}</p>
            <p>joined: {new Date(userData?.createdAt).toLocaleDateString('en-GB')}</p>
            <button onClick={logOut} className='btn'>
               Log Out
            </button>
         </div>
      </section>
   );
};
