import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FontAwesome } from '../../../../utils/icons';
import './Pagination.css';

export const Pagination = ({ fetchData, data, setLoading, ready }) => {
   const { id } = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   let currentPageRef = useRef(1);

   const nextPage = (e) => {
      let click = e.target;
      // prevent action when click outside
      if (click.closest('.pagIcon').classList.contains('disabled')) return;
      if (!click.dataset.action) return;

      if (click.dataset.action === 'next') currentPageRef.current++;
      else currentPageRef.current--;

      setLoading(true);
      fetchData({
         url: `comments/${id}/q?page=${currentPageRef.current}`,
      });
   };

   console.log(data?.numberOfResults);
   console.log(Math.ceil(data?.numberOfResults / 3));
   useEffect(() => {
      if (!ready) return;
      setCurrentPage(currentPageRef.current);
      setLoading(false);
   }, [ready, data]);

   return (
      <div onClick={nextPage} className='pagination'>
         <button
            className={`pagIcon ${currentPage === 1 ? 'disabled' : ''}`}
            disabled={currentPage === 1}
            data-action={'prev'}
         >
            <FontAwesome iconName={'angle-left'} />
         </button>
         <p className='pagination__page'>{currentPage}</p>
         <button
            className={`pagIcon ${currentPage === Math.ceil(data?.numberOfResults / 3) ? 'disabled' : ''}`}
            disabled={currentPage === Math.ceil(data?.numberOfResults / 3)}
            data-action={'next'}
         >
            <FontAwesome iconName={'angle-right'} />
         </button>
      </div>
   );
};
