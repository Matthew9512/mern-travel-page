import React, { useContext, useMemo, useRef, useState } from 'react';
import '../PostsSection/PostsSection';
import debounce from 'lodash.debounce';
import { usePopupMessage } from '../../hooks/usePopupMessage';
import { AuthContext } from '../../context/AuthContext';
import '../PostsSection/PostsSection.css';

export const EvaluatePost = ({ post }) => {
   const [likes, setLikes] = useState(post.likes);
   const { auth } = useContext(AuthContext);
   const likesAmount = useRef();

   const { contextHolder, success, error, info } = usePopupMessage();

   const updatePostLikes = async function (e) {
      console.log(`update`);
      const id = e.target.closest('.post').id;

      try {
         const res = await fetch(`http://localhost:8000/search/likes`, {
            method: 'PATCH',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, likes: +likesAmount.current.innerHTML }),
         });

         const data = await res.json();
         success(data.message);
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   const debouncedChangeHandler = useMemo(() => debounce(updatePostLikes, 1000), []);

   const increase = (e) => {
      if (auth === 'Log in') return info();

      setLikes((prev) => prev + 1);
      debouncedChangeHandler(e);
   };

   const decrease = (e) => {
      if (likes === 0) return;
      if (auth === 'Log in') setLikes((prev) => prev - 1);
      debouncedChangeHandler(e);
   };

   return (
      <div className='evaluate'>
         {contextHolder}
         <i onClick={increase} className={`fa-regular fa-thumbs-up ${auth === 'Log in' ? 'disabled' : ''}`}></i>
         {/* <i onClick={increase} className='fa-regular fa-thumbs-up'></i> */}
         <p ref={likesAmount}>{likes}</p>
         <i onClick={decrease} className={`fa-regular fa-thumbs-down ${auth === 'Log in' ? 'disabled' : ''}`}></i>
      </div>
   );
};
