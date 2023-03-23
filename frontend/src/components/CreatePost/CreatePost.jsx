import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../PostsSection/PostsSection';

export const CreatePost = ({ update }) => {
   const { id } = useParams();
   const commentRef = useRef();

   const sendComment = async () => {
      const res = await fetch(`http://localhost:8000/search/${id}/comments`, {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            id: id,
            username: JSON.parse(localStorage.getItem('user')),
            post: commentRef.current.value,
         }),
      });
      const resData = await res.json();
      update();
   };

   return (
      <div className='create__comment'>
         <img className='user-img' src='user-img' alt='user img' />
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
