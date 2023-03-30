import React, { useContext, useMemo, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import debounce from 'lodash.debounce';
import '../PostsSection/PostsSection';
import '../PostsSection/PostsSection.css';
import { patchPostLikes } from '../../hooks/useFetchConfig';

export const EvaluatePost = ({ post }) => {
   const [likes, setLikes] = useState(post.likes);
   const { auth } = useContext(AuthContext);
   const likesAmount = useRef();

   const { updatePostLikes, contextHolder, info } = patchPostLikes();

   const debouncedChangeHandler = useMemo(() => debounce(updatePostLikes, 1000), []);

   const increase = (e) => {
      if (auth === 'Log in') return info(`You have to be logged in order to rate comments`);
      setLikes((prev) => prev + 1);
      debouncedChangeHandler(e, likesAmount);
   };

   const decrease = (e) => {
      if (likes === 0) return;
      if (auth === 'Log in') return info(`You have to be logged in order to rate comments`);
      setLikes((prev) => prev - 1);
      debouncedChangeHandler(e, likesAmount);
   };

   return (
      <div className='evaluate'>
         {contextHolder}
         <i onClick={increase} className={`fa-regular fa-thumbs-up ${auth === 'Log in' ? 'disabled' : ''}`}></i>
         <p ref={likesAmount}>{likes}</p>
         <i onClick={decrease} className={`fa-regular fa-thumbs-down ${auth === 'Log in' ? 'disabled' : ''}`}></i>
      </div>
   );
};
