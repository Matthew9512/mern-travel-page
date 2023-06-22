import { useContext } from 'react';
import { formatDistanceStrict } from 'date-fns';
import { AuthContext } from '../../../../context/AuthContext';
import { CommentsButtons } from '../CommentsButtons/CommentsButtons';
import { RateComments } from '../RateComments/RateComments';
import { FontAwesome } from '../../../../utils/icons';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner';

export const DisplayComments = ({ data, loading, setData }) => {
   const { userData } = useContext(AuthContext);

   if (!data?.comments.length)
      return (
         <p className='error-message'>
            Nobody responded to this post yet. Add your thoughts and get the conversation going.
         </p>
      );

   return (
      <article className='posts__wrapper'>
         <LoadingSpinner loading={loading} />
         {data?.comments.map((value) => {
            return (
               <div key={value._id} data-user={value.username} id={value._id} className='post'>
                  <RateComments resData={value} />
                  <div>
                     <div className='details__wrapper'>
                        <div className='user__info'>
                           <div className='user-avatar'>
                              <FontAwesome iconName='user' classType='user-img' />
                           </div>
                           <p className='username'>{value.username}</p>
                           <p className='date'>
                              {formatDistanceStrict(new Date(value.createdAt), new Date(), { addSuffix: true })}
                           </p>
                        </div>
                        {/* display buttons only for user that is logged in */}
                        {!userData ? (
                           ''
                        ) : value.username === userData?.username ? (
                           <CommentsButtons setData={setData} />
                        ) : (
                           ''
                        )}
                     </div>
                     <div className='user__post'>
                        <textarea disabled={true} className='text' defaultValue={value.post}></textarea>
                     </div>
                  </div>
               </div>
            );
         })}
      </article>
   );
};
