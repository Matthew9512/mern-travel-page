import React, { useEffect, useState } from 'react';
import { useAxios } from '../../../../api/useAxios';
import { DisplayComments } from '../DisplayComments/DisplayComments';
import { CreateComments } from '../CreateComments/CreateComments';
import '../../TravelPage.css';

/**
 * @todo loading
 */

export const CommentsSection = ({ id }) => {
   const { fetchData, data } = useAxios();
   const [commentList, setCommentList] = useState([]);

   useEffect(() => {
      fetchData({
         url: `/comments/${id}`,
      });
   }, []);

   useEffect(() => {
      setCommentList(data);
   }, [data]);

   return (
      <section className='comment__section'>
         <>
            <h2 className='comment__section-header'>{!commentList.length ? `` : `${commentList.length} Comments:`}</h2>
            <DisplayComments commentList={commentList} setCommentList={setCommentList} />
            <h3 className='add-comment-header'>Add a Comment:</h3>
            <CreateComments id={id} setCommentList={setCommentList} />
         </>
      </section>
   );
};
