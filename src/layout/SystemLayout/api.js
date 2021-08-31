import request from '@/request';

export const getSecretKey = () => {
  return request({
    method: 'GET',
    url: '/user/getsecretkey',
  });
};
