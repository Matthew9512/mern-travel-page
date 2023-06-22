import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
   const token = localStorage.getItem('access__token') || null;
   const navigate = useNavigate();

   useEffect(() => {
      if (!token) return navigate('/login');
   }, [token]);

   return children;
};
