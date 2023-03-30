import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostData } from '../../hooks/useFetchConfig';
import { CreatePost } from '../CreatePost/CreatePost';
import { DisplayPosts } from '../DisplayPosts/DisplayPosts';
import './PostsSection.css';

export const PostsSection = () => {
   const { id } = useParams();

   const [updatePage, setUpdatePage] = useState(false);

   const { fetchData, post } = fetchPostData();

   useEffect(() => {
      const controller = new AbortController();
      fetchData(id);

      return () => controller.abort();
   }, [updatePage]);

   return (
      <section className='comment__section'>
         <h2 className='comment__section-header'>Users comments:</h2>
         <DisplayPosts post={post} setUpdatePage={setUpdatePage} />
         <h3 className='add-comment-header'>Add your comment:</h3>
         <CreatePost update={() => setUpdatePage((prev) => !prev)} />
      </section>
   );
};
