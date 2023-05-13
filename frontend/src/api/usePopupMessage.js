import { message } from 'antd';

export const usePopupMessage = () => {
   const [messageApi, contextHolder] = message.useMessage();

   const successMsg = (value) => {
      messageApi.success(value, 3);
   };
   const errorMsg = (value) => {
      messageApi.error(value, 3);
   };
   const infoMsg = (value) => {
      messageApi.info(value, 3);
   };

   return { contextHolder, successMsg, errorMsg, infoMsg };
};
