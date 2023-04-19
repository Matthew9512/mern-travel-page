import React, { useEffect, useState } from 'react';
// import '../../TravelPage.css';
import { useFetch } from '../../../../api/useFetch';

/**
 *
 * @todo width of active edit textfield !!!
 * @todo state for disabling textfield?
 * @todo change edit/save on btns to icons?
 */

export const CommentsButtons = ({ setRender }) => {
   const [value, setValue] = useState(false);
   const { fetchData, contextHolder, ready } = useFetch();

   // edit comment
   const changeComment = (e) => {
      const parent = e.target.closest('.post');
      const id = parent.id;
      const textField = parent.querySelector('.text');

      const body = {
         post: textField.value,
         id,
      };

      if (!value) {
         setValue((prev) => !prev);
         textField.disabled = false;
         textField.classList.add('active');
      } else {
         setValue((prev) => !prev);
         textField.disabled = true;
         textField.classList.remove('active');
         // fetchData(`/search/:id/comments`, 'PATCH', body);
         fetchData(`/comments/:id`, 'PATCH', body);
      }
   };

   // delete comment from db
   const deleteComment = (e) => {
      const id = e.target.closest('.post').id;

      const body = {
         id,
      };

      // fetchData(`/search/delete`, 'DELETE', body);
      fetchData(`/comments/delete`, 'DELETE', body);
   };

   // wait for fulfilled respond then rerender the component
   useEffect(() => {
      console.log('CommentsButtons effect');
      if (ready) setRender((prev) => !prev);
   }, [ready]);

   return (
      <div className='post__btns'>
         {contextHolder}
         <button onClick={(e) => changeComment(e)} className='btn btn-edit'>
            {!value ? 'Edit' : 'Save'}
         </button>
         <button onClick={(e) => deleteComment(e)} className='btn btn-delete'>
            Delete
         </button>
      </div>
   );
};
