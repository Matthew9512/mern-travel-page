import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useFetch } from '../../../../api/useFetch';

export const CreateComments = ({ id, setRender }) => {
   const { auth } = useContext(AuthContext);
   const { fetchData, contextHolder, ready } = useFetch();
   const commentRef = useRef();

   const sendComment = async () => {
      const { username } = JSON.parse(localStorage.getItem('travel__user'));

      const body = {
         id,
         username,
         post: commentRef.current.value,
      };

      await fetchData(`/search/${id}/comments`, 'POST', body);
   };

   // wait for fulfilled respond then save user in ls and change auth user state
   useEffect(() => {
      if (ready) setRender((prev) => !prev);
   }, [ready]);

   return (
      <div className='create__comment'>
         {contextHolder}
         <textarea ref={commentRef} className='user-comment' id='user-comment' placeholder='add a comment' maxLength={250}></textarea>
         <div className='create__comment-wrapper'>
            <div className='user-avatar'>
               <i className='fa-solid fa-user user-img-create'></i>
            </div>
            <button onClick={sendComment} disabled={auth === 'Log in'} className={`btn btn-send ${auth === 'Log in' ? 'disabled' : ''} `}>
               Send
            </button>
         </div>
      </div>
   );
};
