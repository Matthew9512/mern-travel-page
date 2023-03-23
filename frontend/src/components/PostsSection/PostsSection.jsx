import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreatePost } from '../CreatePost/CreatePost';
import { DisplayPosts } from '../DisplayPosts/DisplayPosts';
import './PostsSection.css';

export const PostsSection = () => {
   const { id } = useParams();

   const [post, setPost] = useState([]);
   const [updatePage, setUpdatePage] = useState(false);

   const controller = new AbortController();
   const signal = controller.signal;

   useEffect(() => {
      fetchData();

      return () => controller.abort();
   }, [updatePage]);

   const fetchData = async () => {
      try {
         const res = await fetch(`http://localhost:8000/search/${id}/comments`, signal);
         if (res.status !== 200) {
            throw new Error(`Wrong id, redirecting to home page`);
         } else {
            const data = await res.json();
            setPost(data);
         }
      } catch (error) {
         console.error(error.message);
      }
   };

   return (
      <section className='comment__section'>
         <DisplayPosts post={post} />
         <CreatePost update={() => setUpdatePage((prev) => !prev)} />
      </section>
   );
};
