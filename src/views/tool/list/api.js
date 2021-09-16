import request from '@/request';

export const apiGetFileList = () => {
  return request({
    method: 'GET',
    url: '/tool/assetslist',
  });
};
