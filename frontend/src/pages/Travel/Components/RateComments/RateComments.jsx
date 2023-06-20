import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useAxios } from '../../../../api/useAxios';
import { FontAwesome } from '../../../../utils/icons';

export const RateComments = ({ resData }) => {
   const { userData } = useContext(AuthContext);
   const likesAmount = useRef();
   const { fetchData, contextHolder } = useAxios(true);
   const [likes, setLikes] = useState(resData.likes);
   //
   const [icons, setIcons] = useState();

   useEffect(() => {
      if (!userData) return setIcons('');
      const postIDs = userData?.userLikes.filter((value) => value.postID === resData._id);

      const rateTypes = postIDs.map((post) => post.rateType);
      return rateTypes.length > 0 ? setIcons(rateTypes[0]) : setIcons('');
   }, []);

   // update likes amount in db
   const updateLikes = async (click, value) => {
      const id = click.closest('.post').id;

      await fetchData({
         method: `PATCH`,
         url: `comments/likes/rate`,
         data: { id, likes: value },
      });
      await fetchData({
         method: `PATCH`,
         url: `/user/likes/rate/update`,
         data: {
            id: userData?._id,
            userLikes: {
               postID: id,
               rateType: click.dataset.icon,
            },
         },
      });
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
         <button onClick={checkIfRated} disabled={!userData} className={`${!userData ? 'disabled' : ''}`}>
            <FontAwesome iconName='thumbs-up' classType={`rate-btn ${icons === 'thumbs-up' ? 'rated' : ''}`} />
         </button>
         <p className='likes' ref={likesAmount}>
            {likes}
         </p>
         <button onClick={checkIfRated} disabled={!userData} className={`${!userData ? 'disabled' : ''}`}>
            <FontAwesome iconName='thumbs-down' classType={`rate-btn ${icons === 'thumbs-down' ? 'rated' : ''}`} />
         </button>
      </div>
   );
};
