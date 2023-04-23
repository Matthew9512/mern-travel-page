import React, { useContext, useRef, useState } from 'react';
import { useFetch } from '../../../../api/useFetch';
import { AuthContext } from '../../../../context/AuthContext';

export const RateComments = ({ data }) => {
   const [likes, setLikes] = useState(data.likes);
   const { userData } = useContext(AuthContext);
   const likesAmount = useRef();
   const { fetchData, contextHolder, info } = useFetch();

   // update likes amount in db
   const updateLikes = (click, value, update) => {
      console.log(`updateLikes`);
      const id = click.closest('.post').id;

      const body = {
         id,
         likes: value,
         userLikes: {
            userID: userData.id,
            rateType: click.className,
         },
      };

      if (!update) fetchData(`/comments/likes/rate`, 'PATCH', body);
      else fetchData(`/comments/likes/rate/update`, 'PATCH', body);
   };

   const checkIfRated = (e) => {
      const click = e.target;

      // take all rate buttons inside current comment
      const rate = [...click.closest('.post').querySelectorAll('.fa-solid')];

      // find element that has 'rated' class active
      const [hasRatedClass] = rate.filter((value) => value.classList.contains('rated'));

      if (click.classList.contains('fa-thumbs-up')) increase(click, hasRatedClass);
      if (click.classList.contains('fa-thumbs-down')) decrease(click, hasRatedClass);
   };

   // increase amount of likes
   const increase = (click, hasRatedClass) => {
      if (click.classList.contains('rated')) {
         click.classList.remove('rated');
         setLikes((prev) => prev - 1);
         const value = +likesAmount.current.innerHTML - 1;
         updateLikes(click, value);
      } else {
         click.classList.add('rated');
         setLikes((prev) => prev + 1);
         const value = +likesAmount.current.innerHTML + 1;
         updateLikes(click, value, true);
         if (!hasRatedClass) return;

         // remove 'rated' class if is active
         hasRatedClass.classList.remove('rated');
      }
   };

   // decrease amount of likes
   const decrease = (click, hasRatedClass) => {
      if (click.classList.contains('rated')) {
         click.classList.remove('rated');
         setLikes((prev) => prev + 1);
         const value = +likesAmount.current.innerHTML + 1;
         updateLikes(click, value);
      } else {
         click.classList.add('rated');
         setLikes((prev) => prev - 1);
         const value = +likesAmount.current.innerHTML - 1;
         updateLikes(click, value, true);
         if (!hasRatedClass) return;

         // remove 'rated' class if is active
         hasRatedClass.classList.remove('rated');
      }
   };

   //
   const [rateType] = data.userLikes.filter((value) => {
      const findUser = value.userID === userData.id;
      if (findUser) return value.rateType;
      else return '';
   });

   return (
      <div className='evaluate'>
         {contextHolder}
         <button
            onClick={checkIfRated}
            disabled={userData.username === 'Log in'}
            className={`${userData.username === 'Log in' ? 'disabled' : ''}`}
         >
            <i
               className={`${
                  rateType?.rateType === 'fa-solid fa-thumbs-up rated' ? 'fa-solid fa-thumbs-up rated' : 'fa-solid fa-thumbs-up'
               } `}
            ></i>
         </button>
         <p className='likes' ref={likesAmount}>
            {likes}
         </p>
         <button
            onClick={checkIfRated}
            disabled={userData.username === 'Log in'}
            className={`${userData.username === 'Log in' ? 'disabled' : ''}`}
         >
            <i
               className={`${
                  rateType?.rateType === 'fa-solid fa-thumbs-down rated' ? 'fa-solid fa-thumbs-down rated' : 'fa-solid fa-thumbs-down'
               }`}
            ></i>
         </button>
      </div>
   );
   // return (
   //    <div className='evaluate'>
   //       {contextHolder}
   //       <button onClick={checkIfRated} disabled={userData.username === 'Log in'}>
   //          <i className={`fa-solid fa-thumbs-up ${userData.username === 'Log in' ? 'disabled' : ''}`}></i>
   //       </button>
   //       <p className='likes' ref={likesAmount}>
   //          {likes}
   //       </p>
   //       <button onClick={checkIfRated} disabled={userData.username === 'Log in'}>
   //          <i className={`fa-solid fa-thumbs-down ${userData.username === 'Log in' ? 'disabled' : ''}`}></i>
   //       </button>
   //    </div>
   // );
};
