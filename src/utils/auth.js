import localStorage from '@u/localStorage';

export const getToken = () => {
  const userInfo = localStorage.getValue('userInfo');
  return (userInfo && userInfo.token) || '';
};
