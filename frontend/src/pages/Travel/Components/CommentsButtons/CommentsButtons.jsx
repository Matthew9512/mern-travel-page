import React, { useEffect, useRef, useState } from 'react';
import { useAuthUser } from '../../../../api/useAuthUser';
import { LoadingButton } from '../../../../components/LoadingButton';
import { FontAwesome } from '../../../../utils/icons';

/**
 * @todo width of active edit textfield !!!
 * @todo state for disabling textfield and style?
 * @todo error
 */

export const CommentsButtons = ({ setCommentList }) => {
   const [icon, setIcon] = useState(false);
   const { authUser, ready, error, contextHolder } = useAuthUser();
   const [btnLoad, setBtnLoad] = useState(<FontAwesome iconName='check' />);
   const [btnDelete, setBtnDelete] = useState(<FontAwesome iconName='trash' />);
   // ref for storing ID of clicked element used when promise was successful
   const deleteIDRef = useRef();

   // edit comment
   const changeComment = async (e) => {
      const parent = e.target.closest('.post');
      const id = parent.id;
      const textField = parent.querySelector('.text');

      if (!icon) {
         setIcon(true);
         textField.disabled = false;
         textField.classList.add('active');
      } else {
         setBtnLoad(<LoadingButton />);
         textField.disabled = true;
         textField.classList.remove('active');

         await authUser({
            method: 'PATCH',
            url: `/comments/${id}`,
            data: { post: textField.value, id },
         });

         setBtnLoad(<FontAwesome iconName='check' />);
      }
   };

   // delete comment from db
   const deleteComment = async (e) => {
      setBtnDelete(<LoadingButton />);
      const id = e.target.closest('.post').id;

      // ID of clicked element for filter array
      deleteIDRef.current = id;

      await authUser({
         method: 'DELETE',
         url: `/comments/delete`,
         data: { id },
      });

      setBtnDelete(<FontAwesome iconName='trash' />);
   };

   // wait for fulfilled respond then rerender the component
   useEffect(() => {
      if (!ready) return;
      setIcon(false);
      // remove from state arr comment that do not match ID of clicked element
      setTimeout(() => {
         setCommentList((prev) => prev.filter((value) => value.postID !== deleteIDRef.current));
      }, 1700);
   }, [ready]);

   return (
      <div className='post__btns'>
         {contextHolder}
         <button onClick={changeComment} className='btn btn-edit'>
            {!icon ? <FontAwesome iconName='pen-to-square' /> : btnLoad}
         </button>
         <button onClick={deleteComment} ref={deleteIDRef} className='btn btn-delete'>
            {btnDelete}
         </button>
      </div>
   );
};
