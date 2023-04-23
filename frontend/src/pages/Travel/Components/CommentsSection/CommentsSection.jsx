import React, { useEffect, useState } from 'react';
import '../../TravelPage.css';
import { DisplayComments } from '../DisplayComments/DisplayComments';
import { CreateComments } from '../CreateComments/CreateComments';
import { useFetch } from '../../../../api/useFetch';
import { LoadingButton } from '../../../../components/LoadingButton';

export const CommentsSection = ({ id }) => {
   const [render, setRender] = useState(false);
   const { fetchData, data } = useFetch();

   useEffect(() => {
      console.log(`CommentsSection effect`);
      // fetchData(`/search/${id}/comments`);
      fetchData(`/comments/${id}`);
   }, [render]);

   return (
      <section className='comment__section'>
         {!data ? (
            <LoadingButton />
         ) : (
            <>
               <h2 className='comment__section-header'>{!data.data.length ? `` : `${data.data.length} Comments:`}</h2>
               <DisplayComments data={data} setRender={setRender} />
               <h3 className='add-comment-header'>Add a Comment:</h3>
               <CreateComments id={id} setRender={setRender} />
            </>
         )}
      </section>
   );
};
