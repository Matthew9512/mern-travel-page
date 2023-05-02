import React, { useEffect, useState } from 'react';
import '../../TravelPage.css';
import { DisplayComments } from '../DisplayComments/DisplayComments';
import { CreateComments } from '../CreateComments/CreateComments';
import { useFetch } from '../../../../api/useFetch';
import { LoadingButton } from '../../../../components/LoadingButton';

export const CommentsSection = ({ id }) => {
   const { fetchData, data } = useFetch();
   const [commentList, setCommentList] = useState([]);

   useEffect(() => {
      console.log(`CommentsSection effect`);
      fetchData(`/comments/${id}`);
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
// import React, { useEffect } from 'react';
// import '../../TravelPage.css';
// import { DisplayComments } from '../DisplayComments/DisplayComments';
// import { CreateComments } from '../CreateComments/CreateComments';
// import { useFetch } from '../../../../api/useFetch';
// import { LoadingButton } from '../../../../components/LoadingButton';

// export const CommentsSection = ({ id }) => {
//    const { fetchData, data } = useFetch();

//    useEffect(() => {
//       console.log(`CommentsSection effect`);
//       fetchData(`/comments/${id}`);
//    }, []);

//    return (
//       <section className='comment__section'>
//          {data.length === 0 ? (
//             <LoadingButton />
//          ) : (
//             <>
//                <h2 className='comment__section-header'>{!data.length ? `` : `${data.length} Comments:`}</h2>
//                <DisplayComments data={data} />
//                <h3 className='add-comment-header'>Add a Comment:</h3>
//                <CreateComments id={id} />
//             </>
//          )}
//       </section>
//    );
// };
