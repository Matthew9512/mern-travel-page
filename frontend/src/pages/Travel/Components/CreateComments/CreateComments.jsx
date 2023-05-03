import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { useFetch } from '../../../../api/useFetch';
import { LoadingButton } from '../../../../components/LoadingButton';
import { FontAwesome } from '../../../../utils/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CreateComments = ({ id, setCommentList }) => {
   const { userData } = useContext(AuthContext);
   const { fetchData, data, loading, ready, contextHolder } = useFetch();
   const commentRef = useRef();

   const sendComment = async () => {
      const body = {
         id,
         username: userData.at(0).username,
         post: commentRef.current.value,
      };

      await fetchData(`/comments/${id}`, 'POST', body);
      commentRef.current.value = '';
   };

   // wait for fulfilled respond then save user in ls and change auth user state
   useEffect(() => {
      if (!ready) return;
      setCommentList(data.sendComments);
   }, [ready]);

   return (
      <div className='create__comment'>
         {contextHolder}
         <textarea ref={commentRef} className='user-comment' id='user-comment' placeholder='add a comment' maxLength={250}></textarea>
         <div className='create__comment-wrapper'>
            <div className='user-avatar'>
               <FontAwesome iconName='user' className='user-img' />
               {/* <FontAwesomeIcon icon='user' className='user-img' /> */}
               {/* <i className='fa-solid fa-user user-img'></i> */}
            </div>
            <button onClick={sendComment} disabled={!userData.length} className={`btn btn-send ${!userData.length ? 'disabled' : ''} `}>
               {loading ? <LoadingButton /> : '+Add'}
            </button>
         </div>
      </div>
   );
};
