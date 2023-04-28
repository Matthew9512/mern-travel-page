import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../../api/useFetch';
import { LoadingButton } from '../../../../components/LoadingButton';
import { PopupMessage } from '../../../../components/PopupMessage/PopupMessage';
import { usePopupMessage } from '../../../../api/usePopupMessage';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * @todo width of active edit textfield !!!
 * @todo state for disabling textfield and style?
 */

export const CommentsButtons = ({ setRender }) => {
   const [icon, setIcon] = useState(false);
   const { fetchData, data, ready } = useFetch();
   const { contextHolder, successMsg } = usePopupMessage();
   // const [btnLoad, setBtnLoad] = useState(<FontAwesomeIcon icon='check' />);
   // const [btnDelete, setBtnDelete] = useState(<FontAwesomeIcon icon='trash' />);
   const [btnLoad, setBtnLoad] = useState(<i className='fa-solid fa-check'></i>);
   const [btnDelete, setBtnDelete] = useState(<i className='fa-solid fa-trash'></i>);

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
         setBtnLoad(<i className='fa-solid fa-check'></i>);
      }
   };

   // delete comment from db
   const deleteComment = async (e) => {
      setBtnDelete(<LoadingButton />);
      const id = e.target.closest('.post').id;

      const body = {
         id,
      };

      // fetchData(`/search/delete`, 'DELETE', body);
      await fetchData(`/comments/delete`, 'DELETE', body);
      setBtnDelete(<i className='fa-solid fa-trash'></i>);
   };

   // wait for fulfilled respond then rerender the component
   useEffect(() => {
      if (!ready) return;
      console.log('CommentsButtons effect');
      setRender(true);
      setIcon(false);
      successMsg(data.message);

      return () => setRender(false);
   }, [ready]);

   return (
      <div className='post__btns'>
         {contextHolder}
         {/* <button onClick={changeComment} loading={loading} className='btn btn-edit'>
            {!icon ? <i className='fa-solid fa-pen-to-square'></i> : btnLoad}
         </button> */}
         {/* <PopupMessage ready={ready} error={errorMsg} message={data?.message} /> */}
         <button onClick={changeComment} className='btn btn-edit'>
            {/* {!icon ? <FontAwesomeIcon icon='pen-to-square' /> : btnLoad} */}
            {!icon ? <i className='fa-solid fa-pen-to-square'></i> : btnLoad}
         </button>
         <button onClick={deleteComment} className='btn btn-delete'>
            {btnDelete}
         </button>
      </div>
   );
};
