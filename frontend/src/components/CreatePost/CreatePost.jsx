import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { postComment } from '../../hooks/useFetchConfig';
import '../PostsSection/PostsSection';

export const CreatePost = ({ update }) => {
   const { id } = useParams();
   const commentRef = useRef();

   const { sendComment, contextHolder, auth } = postComment();

   return (
      <div className='create__comment'>
         {contextHolder}
         <div className='user-avatar'>
            <i className='fa-solid fa-user user-img-create'></i>
         </div>
         <textarea ref={commentRef} className='user-comment' id='user-comment' placeholder='add a comment' maxLength={250}></textarea>
         <button onClick={() => sendComment(id, update, commentRef)} className={`btn btn-send ${auth === 'Log in' ? 'disabled' : ''} `}>
            Send
         </button>
      </div>
   );
};