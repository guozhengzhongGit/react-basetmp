import request from '@/request';

export const apiGetContentList = (params) => {
  return request({
    method: 'GET',
    url: '/content/list',
    params,
  });
};

// export const apiPostSubmitContent = (params) => {
//   return request({
//     method: 'POST',
//     url: '/content/create',
//     params,
//   });
// };
