import React, { useContext } from 'react';
// import '../../TravelPage.css';
import { dateFormat } from '../../../../utils/dateFormat';
import { AuthContext } from '../../../../context/AuthContext';
import { CommentsButtons } from '../CommentsButtons/CommentsButtons';
import { RateComments } from '../RateComments/RateComments';

export const DisplayComments = ({ data, setRender }) => {
   const { auth } = useContext(AuthContext);

   // if (!data.data) return <p>Loading...</p>;

   if (!data.data.length) return <p>Be first to add comment</p>;

   return (
      <article className='posts__wrapper'>
         {data.data.map((value) => {
            // format dates of submiting post
            const formatedDate = dateFormat(value.createdAt);
            return (
               <div key={value.postID} data-user={value.username} id={value.postID} className='post'>
                  <RateComments data={value} />
                  <div className=''>
                     <div className='details__wrapper'>
                        <div className='user__info'>
                           <div className='user-avatar'>
                              <i className='fa-solid fa-user user-img'></i>
                           </div>
                           <p className='username'>{value.username}</p>
                           <p className='date'>{formatedDate}</p>
                        </div>
                        {/* display buttons only for user that is logged in */}
                        {value.username === auth ? <CommentsButtons setRender={setRender} /> : ''}
                     </div>
                     <div className='user__post'>
                        <textarea disabled={true} className='text' defaultValue={value.post}></textarea>
                     </div>
                  </div>
               </div>
            );
         })}
      </article>
   );
};
