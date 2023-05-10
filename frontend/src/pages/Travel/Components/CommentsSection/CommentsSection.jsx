import React, { useEffect, useState } from 'react';
import { DisplayComments } from '../DisplayComments/DisplayComments';
import { CreateComments } from '../CreateComments/CreateComments';
import { useAxios } from '../../../../api/useAxios';
import '../../TravelPage.css';

/**
 * @todo loading
 */

export const CommentsSection = ({ id }) => {
   const { fetchData, data } = useAxios();
   const [commentList, setCommentList] = useState([]);

   useEffect(() => {
      console.log(`CommentsSection effect`);
      fetchData({
         url: `/comments/${id}`,
      });
   }, []);

   useEffect(() => {
      setCommentList(data);
   }, [data]);

   return (
      <section className='comment__section'>
         {/* {!data.length ? (
            <p className='error-message'>Nobody responded to this post yet. Add your thoughts and get the conversation going.</p>
         ) : ( */}
         <>
            <h2 className='comment__section-header'>{!commentList.length ? `` : `${commentList.length} Comments:`}</h2>
            <DisplayComments commentList={commentList} setCommentList={setCommentList} />
            <h3 className='add-comment-header'>Add a Comment:</h3>
            <CreateComments id={id} setCommentList={setCommentList} />
         </>
         {/* )} */}
      </section>
   );
};
