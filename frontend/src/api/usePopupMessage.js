import { message } from 'antd';

export const usePopupMessage = () => {
   const [messageApi, contextHolder] = message.useMessage();

   const successMsg = (value) => {
      messageApi.success(value, 2);
   };
   const errorMsg = (value) => {
      messageApi.error(value, 2);
   };
   const infoMsg = (value) => {
      messageApi.info(value, 2);
   };

   return { contextHolder, successMsg, errorMsg, infoMsg };
};
// import { message } from 'antd';

// export const usePopupMessage = () => {
//    const [messageApi, contextHolder] = message.useMessage();

//    const successMsg = (value) => {
//       messageApi
//          .open({
//             type: 'loading',
//             content: 'Action in progress..',
//             duration: 1,
//          })
//          .then(() => message.success(value, 2.5));
//    };
//    const errorMsg = (value) => {
//       messageApi
//          .open({
//             type: 'loading',
//             content: 'Action in progress..',
//             duration: 1,
//          })
//          .then(() => message.error(value, 2.5));
//    };
//    const infoMsg = (value) => {
//       messageApi
//          .open({
//             type: 'loading',
//             content: 'Action in progress..',
//             duration: 1,
//          })
//          .then(() => message.info(value, 2.5));
//    };

//    return { contextHolder, successMsg, errorMsg, infoMsg };
// };
