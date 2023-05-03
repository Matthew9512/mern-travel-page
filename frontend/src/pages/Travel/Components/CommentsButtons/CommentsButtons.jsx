import React, { useEffect, useRef, useState } from 'react';
import { useFetch } from '../../../../api/useFetch';
import { LoadingButton } from '../../../../components/LoadingButton';
import { FontAwesome } from '../../../../utils/icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * @todo width of active edit textfield !!!
 * @todo state for disabling textfield and style?
 */

export const CommentsButtons = ({ setCommentList }) => {
   const [icon, setIcon] = useState(false);
   const { fetchData, ready, contextHolder } = useFetch();
   // const [btnLoad, setBtnLoad] = useState(<i className='fa-solid fa-check'></i>);
   // const [btnDelete, setBtnDelete] = useState(<i className='fa-solid fa-trash'></i>);

   // ref for storing ID of clicked element used when promise was successful
   const deleteIDRef = useRef();

   const [btnLoad, setBtnLoad] = useState(<FontAwesome iconName='check' />);
   const [btnDelete, setBtnDelete] = useState(<FontAwesome iconName='trash' />);

   // edit comment
   const changeComment = async (e) => {
      const parent = e.target.closest('.post');
      const id = parent.id;
      const textField = parent.querySelector('.text');

      const body = {
         post: textField.value,
         id,
      };

      if (!icon) {
         setIcon(true);
         textField.disabled = false;
         textField.classList.add('active');
      } else {
         setBtnLoad(<LoadingButton />);
         textField.disabled = true;
         textField.classList.remove('active');
         await fetchData(`/comments/:id`, 'PATCH', body);
         setBtnLoad(<FontAwesome iconName='check' />);
      }
   };

   // delete comment from db
   const deleteComment = async (e) => {
      setBtnDelete(<LoadingButton />);
      const id = e.target.closest('.post').id;

      // ID of clicked element
      deleteIDRef.current = id;

      const body = {
         id,
      };

      await fetchData(`/comments/delete`, 'DELETE', body);
      setBtnDelete(<FontAwesome iconName='trash' />);
   };

   // wait for fulfilled respond then rerender the component
   useEffect(() => {
      if (!ready) return;
      console.log('CommentsButtons effect');
      setIcon(false);

      // with message
      // ==
      setTimeout(() => {
         setCommentList((prev) => prev.filter((value) => value.postID !== deleteIDRef.current));
      }, 1000);
      // ==

      // without message
      // remove from state arr comment that do not match ID of clicked element
      // setCommentList((prev) => prev.filter((value) => value.postID !== deleteIDRef.current));
   }, [ready]);

   return (
      <div className='post__btns'>
         {contextHolder}
         <button onClick={changeComment} className='btn btn-edit'>
            {!icon ? <FontAwesome iconName='pen-to-square' /> : btnLoad}
            {/* {!icon ? <FontAwesomeIcon icon='pen-to-square' /> : btnLoad} */}
            {/* {!icon ? <i className='fa-solid fa-pen-to-square'></i> : btnLoad} */}
         </button>
         <button onClick={deleteComment} ref={deleteIDRef} className='btn btn-delete'>
            {btnDelete}
         </button>
      </div>
   );
};
