import React, { useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { usePopupMessage } from '../../hooks/usePopupMessage';
import '../PostsSection/PostsSection';

export const CreatePost = ({ update }) => {
   const { auth } = useContext(AuthContext);
   const { id } = useParams();
   const commentRef = useRef();

   const { contextHolder, success, error } = usePopupMessage();

   const sendComment = async () => {
      if (auth === 'Log in') return error(`You need to be logged in in order to post comments`);
      try {
         const res = await fetch(`http://localhost:8000/search/${id}/comments`, {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               id: id,
               username: JSON.parse(localStorage.getItem('travel__user')),
               post: commentRef.current.value,
            }),
         });
         const data = await res.json();
         success(data.message);
         commentRef.current.value = '';
         setTimeout(() => {
            update();
         });
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   return (
      <div className='create__comment'>
         {contextHolder}
         <img className='user-img' src='../../avatar.png' alt='user img' />
         <textarea
            ref={commentRef}
            className='user-comment'
            name='user-comment'
            id='user-comment'
            placeholder='add a comment'
            maxLength={250}
         ></textarea>
         <button onClick={sendComment} className='btn btn-send'>
            Send
         </button>
      </div>
   );
};
