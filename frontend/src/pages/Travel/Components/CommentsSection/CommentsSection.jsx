import { useEffect } from 'react';
import { useAxios } from '../../../../api/useAxios';
import { DisplayComments } from '../DisplayComments/DisplayComments';
import { CreateComments } from '../CreateComments/CreateComments';
import { Pagination } from '../Pagination/Pagination';
import '../../TravelPage.css';

export const CommentsSection = ({ id }) => {
   const { fetchData, data, loading, setData, setLoading, ready, contextHolder } = useAxios(false);

   useEffect(() => {
      fetchData({
         url: `comments/${id}/q?page=1`,
      });
   }, []);

   return (
      <section className='comment__section'>
         <h2 className='comment__section-header'>
            {!data || data?.numberOfResults <= 1 ? `Comments:` : `${data?.numberOfResults} Comments:`}
         </h2>
         {!data || data?.numberOfResults === 0 ? (
            <p className='error-message'>
               Nobody responded to this post yet. Add your thoughts and get the conversation going.
            </p>
         ) : (
            <>
               <DisplayComments data={data} loading={loading} setData={setData} />
               <Pagination fetchData={fetchData} data={data} setLoading={setLoading} ready={ready} />
            </>
         )}
         <h3 className='add-comment-header'>Add a Comment:</h3>
         <CreateComments
            id={id}
            setData={setData}
            fetchData={fetchData}
            loading={loading}
            contextHolder={contextHolder}
         />
      </section>
   );
};
