import request from '@/request';

export const getQiniuToken = () => {
  return request({
    method: 'GET',
    url: '/tool/uploadtoken',
  });
};
