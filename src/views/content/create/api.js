import request from '@/request';

export const apiGetUser = () => {
  return request({
    method: 'GET',
    url: '/user',
  });
};

export const apiGetTag = () => {
  return request({
    method: 'GET',
    url: '/tag/list',
  });
};

export const apiPostSubmitContent = (params) => {
  return request({
    method: 'POST',
    url: '/content/create',
    params,
  });
};
