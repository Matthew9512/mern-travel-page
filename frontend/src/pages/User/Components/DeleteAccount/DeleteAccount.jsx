import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../../../api/useAxios';
import { AuthContext } from '../../../../context/AuthContext';
import { LoadingButton } from '../../../../components/LoadingButton';
import { FontAwesome } from '../../../../utils/icons';
import { removeToken } from '../../../../api/jwtAuth';
import './DeleteAccount.css';

export const DeleteAccount = () => {
   const [open, setOpen] = useState(false);
   const { fetchData, loading, contextHolder } = useAxios(true);
   const { userData, setUserData } = useContext(AuthContext);
   const navigate = useNavigate();

   // remove account and data from client side
   const removeAccount = async () => {
      await fetchData({
         method: 'DELETE',
         url: '/user/delete',
         data: { id: userData._id },
      });
      setOpen(false);
      setUserData(null);
      removeToken();
      setTimeout(() => {
         navigate('/');
      }, 2000);
   };

   return (
      <>
         {contextHolder}
         <div className={`popconfirm ${!open ? 'hidden' : ''}`}>
            <p>Are you sure you want to delete account?</p>
            <div className='popconfirm__btns'>
               <button onClick={() => setOpen(false)} className='btn'>
                  Cancel
               </button>
               {loading ? (
                  <LoadingButton customClass={'btn'} />
               ) : (
                  <button onClick={removeAccount} className='btn'>
                     Confirm
                  </button>
               )}
            </div>
         </div>
         <p onClick={() => setOpen(true)} className='user__bookings-delete'>
            delete account
            <span>
               <FontAwesome iconName={'fa-user-minus'} />
            </span>
         </p>
      </>
   );
};
