import React, { useContext } from 'react';
import { SpinnerContext } from '../../context/SpinnerContext';
import './SkeletonLoader.css';

export const SkeletonLoader = () => {
  const { loading } = useContext(SpinnerContext);
  return (
    <div id='card-template' className={`loader ${loading ? 'hidden' : ''} `}>
      <div className='card'>
        <div className='header'>
          <img className='skeleton skeleton-img' src='https://source.unsplash.com/100x100/?nature' />
          <div className='title' data-title>
            <div className='skeleton skeleton-text'></div>
            <div className='skeleton skeleton-text'></div>
          </div>
        </div>
        <div data-body>
          <div className='skeleton skeleton-text'></div>
          <div className='skeleton skeleton-text'></div>
          <div className='skeleton skeleton-text'></div>
          <div className='skeleton skeleton-text'></div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className={`loader ${loading ? 'hidden' : ''} `}>
  //     <div className='loader__box'>
  //       <span className='loader__box-circle'></span>
  //       <span className='loader__box-circle'></span>
  //       <span className='loader__box-circle'></span>
  //       <span className='loader__box-circle'></span>
  //     </div>
  //   </div>
  // );
};
