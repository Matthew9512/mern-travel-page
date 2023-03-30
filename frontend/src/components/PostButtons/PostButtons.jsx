import React, { useState } from 'react';
import { postBtnsController } from '../../hooks/useFetchConfig';

export const PostButtons = ({ id, setUpdatePage }) => {
   const [edit, setEdit] = useState(false);
   const { deletePost, updatePost, contextHolder } = postBtnsController();

   const editPost = async (e) => {
      const parent = e.target.closest('.post');
      const id = parent.id;
      const textField = parent.querySelector('.text');

      if (!edit) {
         setEdit((prev) => !prev);
         textField.disabled = false;
         textField.classList.add('active');

         console.log(textField);
      } else {
         setEdit((prev) => !prev);
         textField.disabled = true;
         textField.classList.remove('active');
         updatePost(textField.value, id);
      }
   };

   return (
      <>
         <div className='post__btns'>
            {contextHolder}
            <button onClick={editPost} className='btn btn-edit'>
               {!edit ? 'Edit' : 'Save'}
            </button>
            <button onClick={(e) => deletePost(e, setUpdatePage)} className='btn btn-delete'>
               Delete
            </button>
         </div>
      </>
   );
};
