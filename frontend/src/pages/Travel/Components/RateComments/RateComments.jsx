import React, { useContext, useMemo, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useFetch } from '../../../../api/useFetch';
import { AuthContext } from '../../../../context/AuthContext';

/**
 * @todo add feature to add only one like
 */

export const RateComments = ({ data }) => {
   const [likes, setLikes] = useState(data.likes);
   const { auth } = useContext(AuthContext);
   const likesAmount = useRef();

   const { fetchData, contextHolder, info } = useFetch();

   const updateLikes = (e) => {
      console.log(`updateLikes`);
      const id = e.target.closest('.post').id;
      const body = {
         id,
         likes: +likesAmount.current.innerHTML,
      };
      fetchData(`/search/likes`, 'PATCH', body);
   };

   //    wait for user to stop
   const debouncedChangeHandler = useMemo(() => debounce(updateLikes, 1000), []);

   const increase = (e) => {
      if (auth === 'Log in') return info(`You have to be logged in order to rate comments`);
      setLikes((prev) => prev + 1);
      debouncedChangeHandler(e);
   };

   const decrease = (e) => {
      if (likes === 0) return;
      if (auth === 'Log in') return info(`You have to be logged in order to rate comments`);
      setLikes((prev) => prev - 1);
      debouncedChangeHandler(e);
   };

   return (
      <div className='evaluate'>
         {contextHolder}
         <button onClick={increase} disabled={auth === 'Log in'}>
            <i className={`fa-regular fa-thumbs-up ${auth === 'Log in' ? 'disabled' : ''}`}></i>
         </button>
         <p ref={likesAmount}>{likes}</p>
         <button onClick={decrease} disabled={auth === 'Log in'}>
            <i className={`fa-regular fa-thumbs-down ${auth === 'Log in' ? 'disabled' : ''}`}></i>
         </button>
      </div>
   );
};
