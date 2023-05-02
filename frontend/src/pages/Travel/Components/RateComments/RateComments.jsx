import React, { useContext, useRef, useState } from 'react';
import { useFetch } from '../../../../api/useFetch';
import { AuthContext } from '../../../../context/AuthContext';
import { FontAwesome } from '../../../../utils/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const RateComments = ({ resData }) => {
   const { userData, rateIconStyle } = useContext(AuthContext);
   const likesAmount = useRef();
   const { fetchData, contextHolder } = useFetch();
   const [likes, setLikes] = useState(resData.likes);
   const [icons, setIcons] = useState(() => {
      if (!rateIconStyle.length) return '';
      const postIDs = rateIconStyle.filter((value) => value.postID === resData.postID);
      const rateTypes = postIDs.map((post) => post.rateType);
      return rateTypes.length > 0 ? rateTypes[0] : '';
   });

   // update likes amount in db
   const updateLikes = async (click, value) => {
      const id = click.closest('.post').id;

      await fetchData(`/comments/likes/rate`, 'PATCH', {
         id,
         likes: value,
      });
      await fetchData(`/user/likes/rate/update`, 'PATCH', {
         id: userData.at(0).id,
         userLikes: {
            postID: id,
            rateType: click.dataset.icon,
         },
      });

      const lsItems = localStorage.getItem('travel__likes') ? JSON.parse(localStorage.getItem('travel__likes')) : [];
      const newArr = lsItems.filter((value) => value.postID !== id);
      newArr.push({ postID: id, rateType: click.dataset.icon });
      localStorage.setItem('travel__likes', JSON.stringify(newArr));
   };

   const checkIfRated = (e) => {
      const click = e.target;

      // take all rate buttons inside current comment
      const rate = [...click.closest('.post').querySelectorAll('.rate-btn')];

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
         updateLikes(click, value);
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
         updateLikes(click, value);
         if (!hasRatedClass) return;

         // remove 'rated' class if is active
         hasRatedClass.classList.remove('rated');
      }
   };

   return (
      <div className='evaluate'>
         {contextHolder}
         <button onClick={checkIfRated} disabled={!userData.length} className={`${!userData.length ? 'disabled' : ''}`}>
            <FontAwesome iconName='thumbs-up' classType={`rate-btn ${icons === 'thumbs-up' ? 'rated' : ''}`} />
            {/* <FontAwesomeIcon icon='thumbs-down' className='rated' /> */}
            {/* <i
               className={`${
                  rateType?.rateType === 'fa-solid fa-thumbs-up rated' ? 'fa-solid fa-thumbs-up rated' : 'fa-solid fa-thumbs-up'
               } `}
            ></i> */}
         </button>
         <p className='likes' ref={likesAmount}>
            {likes}
         </p>
         <button onClick={checkIfRated} disabled={!userData.length} className={`${!userData.length ? 'disabled' : ''}`}>
            <FontAwesome iconName='thumbs-down' classType={`rate-btn ${icons === 'thumbs-down' ? 'rated' : ''}`} />
            {/* <FontAwesomeIcon icon='thumbs-down' className='rated' /> */}
            {/* <i
               className={`${
                  rateType?.rateType === 'fa-solid fa-thumbs-down rated' ? 'fa-solid fa-thumbs-down rated' : 'fa-solid fa-thumbs-down'
               }`}
            ></i> */}
         </button>
      </div>
   );
};
