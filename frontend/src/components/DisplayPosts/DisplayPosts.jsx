import React from 'react';
import { EvaluatePost } from '../EvaluatePost/EvaluatePost';
import '../PostsSection/PostsSection';

export const DisplayPosts = ({ post }) => {
   if (!post.data?.length) return <p>be first to add comment</p>;

   return (
      <>
         <article className='posts__wrapper'>
            {post.data.map((value, index) => {
               return (
                  <div key={index} className='post'>
                     <EvaluatePost />
                     <div className=''>
                        <div className='user__info'>
                           <img className='user-img' src='' alt='user img' />
                           <p className='user__name'>{value.username}</p>
                           <p className='createdAt'>{value.createdAt}</p>
                        </div>
                        <div className='user__post'>
                           <p className='text'>{value.post}</p>
                        </div>
                     </div>
                  </div>
               );
            })}
         </article>
      </>
   );
};
