import request from '@/request';

export const apiGetContentDetail = (params) => {
  return request({
    method: 'GET',
    url: '/content/detail',
    params,
  });
};
