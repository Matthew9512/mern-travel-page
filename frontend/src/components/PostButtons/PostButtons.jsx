import React, { useState } from 'react';
import { usePopupMessage } from '../../hooks/usePopupMessage';

export const PostButtons = ({ id, setUpdatePage }) => {
   const [edit, setEdit] = useState(false);

   const { contextHolder, success, error } = usePopupMessage();

   const editPost = async (e) => {
      const textField = e.target.closest('.post').querySelector('.text');

      if (!edit) {
         setEdit((prev) => !prev);
         textField.disabled = false;
         textField.classList.add('active');

         console.log(textField);
      } else {
         setEdit((prev) => !prev);
         textField.disabled = true;
         textField.classList.remove('active');
         updatePost(textField.value, e.target.id);
      }
   };

   const deletePost = async (e) => {
      try {
         const res = await fetch(`http://localhost:8000/search/delete`, {
            method: 'DELETE',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: e.target.id }),
         });

         const data = await res.json();
         if (res.status === 200) {
            success(data.message);
            setTimeout(() => {
               setUpdatePage((prev) => !prev);
            }, 1000);

            console.log(data);
         }
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   const updatePost = async (post, id) => {
      console.log(post);
      try {
         const res = await fetch(`http://localhost:8000/search/:id/comments`, {
            method: 'PATCH',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post, id }),
         });

         const data = await res.json();
         if (res.status === 200) {
            success(data.message);
            console.log(data);
         }
      } catch (err) {
         console.log(err.message);
         error(err.message);
      }
   };

   return (
      <>
         <div className='post__btns'>
            {contextHolder}
            <button onClick={editPost} id={id} className='btn btn-edit'>
               {!edit ? 'Edit' : 'Save'}
            </button>
            <button onClick={deletePost} id={id} className='btn btn-delete'>
               Delete
            </button>
         </div>
      </>
   );
};
