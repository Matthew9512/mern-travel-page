import { message } from 'antd';

export const usePopupMessage = () => {
   const [messageApi, contextHolder] = message.useMessage();

   const success = (value) => {
      messageApi
         .open({
            type: 'loading',
            content: 'Action in progress..',
            duration: 1,
         })
         .then(() => message.success(`${value}`, 2.5));
   };
   const error = (value) => {
      messageApi
         .open({
            type: 'loading',
            content: 'Action in progress..',
            duration: 1,
         })
         .then(() => message.error(`${value}`, 2.5));
   };

   return { contextHolder, success, error };
};
