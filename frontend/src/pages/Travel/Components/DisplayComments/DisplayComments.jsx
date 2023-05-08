import React, { useContext } from 'react';
import { dateFormat } from '../../../../utils/dateFormat';
import { AuthContext } from '../../../../context/AuthContext';
import { CommentsButtons } from '../CommentsButtons/CommentsButtons';
import { RateComments } from '../RateComments/RateComments';
import { FontAwesome } from '../../../../utils/icons';

export const DisplayComments = ({ commentList, setCommentList }) => {
   const { userData } = useContext(AuthContext);

   if (!commentList.length)
      return <p className='error-message'>Nobody responded to this post yet. Add your thoughts and get the conversation going.</p>;

   // display buttons only for user that is logged in
   // const properBtns = (value) => {
   //    if (!userData) return '';
   //    else {
   //       if (value.username === userData?.username) return <CommentsButtons setCommentList={setCommentList} />;
   //       else return '';
   //    }
   // };

   return (
      <article className='posts__wrapper'>
         {commentList.map((value) => {
            // format dates of submiting post
            const formatedDate = dateFormat(value.createdAt);
            return (
               <div key={value.postID} data-user={value.username} id={value.postID} className='post'>
                  <RateComments resData={value} />
                  <div>
                     <div className='details__wrapper'>
                        <div className='user__info'>
                           <div className='user-avatar'>
                              <FontAwesome iconName='user' classType='user-img' />
                           </div>
                           <p className='username'>{value.username}</p>
                           <p className='date'>{formatedDate}</p>
                        </div>
                        {/* display buttons only for user that is logged in */}
                        {!userData ? '' : value.username === userData?.username ? <CommentsButtons setCommentList={setCommentList} /> : ''}
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
