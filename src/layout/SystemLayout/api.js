import request from '@/request';

export const getPublicKey = () => {
  return request({
    method: 'GET',
    url: '/user/getpublickey',
  });
};
