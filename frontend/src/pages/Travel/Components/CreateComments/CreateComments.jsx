import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useAxios } from '../../../../api/useAxios';
import { LoadingButton } from '../../../../components/LoadingButton';
import { FontAwesome } from '../../../../utils/icons';

export const CreateComments = ({ id, setData }) => {
   const { userData } = useContext(AuthContext);
   const commentRef = useRef();
   const { fetchData, data, loading, ready, contextHolder } = useAxios(true);

   const sendComment = async () => {
      await fetchData({
         method: `POST`,
         url: `/comments/${id}`,
         data: { id, username: userData?.username, post: commentRef.current.value },
      });
      commentRef.current.value = '';
   };

   // if comment was succesfully created then update comments list
   useEffect(() => {
      if (!ready) return;
      setData(data);
   }, [data]);

   return (
      <article className='create__comment'>
         {contextHolder}
         <textarea
            ref={commentRef}
            className='user-comment'
            id='user-comment'
            placeholder='add a comment'
            maxLength={250}
         ></textarea>
         <div className='create__comment-wrapper'>
            <div className='user-avatar'>
               <FontAwesome iconName='user' classType='user-img' />
            </div>
            <button
               onClick={sendComment}
               disabled={!userData}
               className={`btn btn-send ${!userData ? 'disabled' : ''} `}
            >
               {loading ? <LoadingButton /> : '+Add'}
            </button>
         </div>
      </article>
   );
};
