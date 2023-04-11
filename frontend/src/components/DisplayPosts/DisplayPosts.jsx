import React, { useContext } from 'react';
import { EvaluatePost } from '../EvaluatePost/EvaluatePost';
import '../PostsSection/PostsSection';
import { dateFormat } from '../../utils/dateFormat';
import { AuthContext } from '../../context/AuthContext';
import { PostButtons } from '../PostButtons/PostButtons';

export const DisplayPosts = ({ post, setUpdatePage }) => {
   const { auth } = useContext(AuthContext);

   if (!post.data?.length) return <p>be first to add comment</p>;

   return (
      <>
         <article className='posts__wrapper'>
            {post.data.map((value) => {
               // format dates of submiting post
               const formatedDate = dateFormat(value.createdAt);
               return (
                  <div key={value.postID} data-user={value.username} id={value.postID} className='post'>
                     <EvaluatePost post={value} />
                     <div className=''>
                        <div className='details__wrapper'>
                           <div className='user__info'>
                              <div className='user-avatar'>
                                 <i className='fa-solid fa-user user-img'></i>
                              </div>
                              {/* <img className='user-img' src='../../avatar.png' alt='user img' /> */}
                              <p className='username'>{value.username}</p>
                              <p className='date'>{formatedDate}</p>
                           </div>
                           {/* display buttons only for user that is logged in */}
                           {value.username === auth ? <PostButtons setUpdatePage={setUpdatePage} /> : ''}
                        </div>
                        <div className='user__post'>
                           <textarea disabled={true} className='text' defaultValue={value.post}></textarea>
                        </div>
                     </div>
                  </div>
               );
            })}
         </article>
      </>
   );
};