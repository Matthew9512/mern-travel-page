import React, { useContext } from 'react';
import { dateFormat } from '../../../../utils/dateFormat';
import { AuthContext } from '../../../../context/AuthContext';
import { CommentsButtons } from '../CommentsButtons/CommentsButtons';
import { RateComments } from '../RateComments/RateComments';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DisplayComments = ({ data, setRender }) => {
   const { userData } = useContext(AuthContext);

   if (!data.data.length)
      return <p className='error-message'>Nobody responded to this post yet. Add your thoughts and get the conversation going.</p>;

   return (
      <article className='posts__wrapper'>
         {data.data.map((value) => {
            // format dates of submiting post
            const formatedDate = dateFormat(value.createdAt);
            return (
               <div key={value.postID} data-user={value.username} id={value.postID} className='post'>
                  <RateComments data={value} />
                  <div>
                     <div className='details__wrapper'>
                        <div className='user__info'>
                           <div className='user-avatar'>
                              {/* <FontAwesomeIcon icon='user' className='user-img' /> */}
                              <i className='fa-solid fa-user user-img'></i>
                           </div>
                           <p className='username'>{value.username}</p>
                           <p className='date'>{formatedDate}</p>
                        </div>
                        {/* display buttons only for user that is logged in */}
                        {value.username === userData.username ? <CommentsButtons setRender={setRender} /> : ''}
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
