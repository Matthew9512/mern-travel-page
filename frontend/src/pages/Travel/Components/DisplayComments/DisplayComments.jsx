import React, { useContext } from 'react';
import { dateFormat } from '../../../../utils/dateFormat';
import { AuthContext } from '../../../../context/AuthContext';
import { CommentsButtons } from '../CommentsButtons/CommentsButtons';
import { RateComments } from '../RateComments/RateComments';
import { FontAwesome } from '../../../../utils/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DisplayComments = ({ commentList, setCommentList }) => {
   const { userData } = useContext(AuthContext);

   if (!commentList.length)
      return <p className='error-message'>Nobody responded to this post yet. Add your thoughts and get the conversation going.</p>;

   // display buttons only for user that is logged in
   const properBtns = (value) => {
      if (!userData.length) return '';
      else {
         if (value.username === userData.at(0)?.username) return <CommentsButtons setCommentList={setCommentList} />;
         else return '';
      }
   };

   return (
      <article className='posts__wrapper'>
         {commentList.map((value) => {
            // format dates of submiting post
            const formatedDate = dateFormat(value.createdAt);
            return (
               <div key={value.postID} data-user={value.username} id={value.postID} className='post'>
                  <RateComments data={value} />
                  <div>
                     <div className='details__wrapper'>
                        <div className='user__info'>
                           <div className='user-avatar'>
                              <FontAwesome iconName='user' className='user-img' />
                              {/* <FontAwesomeIcon icon='user' className='user-img' /> */}
                              {/* <i className='fa-solid fa-user user-img'></i> */}
                           </div>
                           <p className='username'>{value.username}</p>
                           <p className='date'>{formatedDate}</p>
                        </div>
                        {/* display buttons only for user that is logged in */}
                        {properBtns(value)}
                        {/* {!userData.length ? (
                           ''
                        ) : value.username === userData.at(0)?.username ? (
                           <CommentsButtons setCommentList={setCommentList} />
                        ) : (
                           ''
                        )} */}
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
// import React, { useContext, useState } from 'react';
// import { dateFormat } from '../../../../utils/dateFormat';
// import { AuthContext } from '../../../../context/AuthContext';
// import { CommentsButtons } from '../CommentsButtons/CommentsButtons';
// import { RateComments } from '../RateComments/RateComments';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// export const DisplayComments = ({ data }) => {
//    const { userData } = useContext(AuthContext);
//    // const [commentList, setCommentList] = useState(data);

//    if (!commentList.length)
//       return <p className='error-message'>Nobody responded to this post yet. Add your thoughts and get the conversation going.</p>;

//    return (
//       <article className='posts__wrapper'>
//          {commentList.map((value) => {
//             // format dates of submiting post
//             const formatedDate = dateFormat(value.createdAt);
//             return (
//                <div key={value.postID} data-user={value.username} id={value.postID} className='post'>
//                   <RateComments data={value} />
//                   <div>
//                      <div className='details__wrapper'>
//                         <div className='user__info'>
//                            <div className='user-avatar'>
//                               {/* <FontAwesomeIcon icon='user' className='user-img' /> */}
//                               <i className='fa-solid fa-user user-img'></i>
//                            </div>
//                            <p className='username'>{value.username}</p>
//                            <p className='date'>{formatedDate}</p>
//                         </div>
//                         {/* display buttons only for user that is logged in */}
//                         {value.username === userData.at(0).username ? <CommentsButtons setCommentList={setCommentList} /> : ''}
//                      </div>
//                      <div className='user__post'>
//                         <textarea disabled={!userData.length} className='text' defaultValue={value.post}></textarea>
//                      </div>
//                   </div>
//                </div>
//             );
//          })}
//       </article>
//    );
// };
