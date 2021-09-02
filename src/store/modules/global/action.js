import * as actions from './constants';
export const toggleSidebarOpened = (isOpen) => ({
  type: actions.TOGGLE_SIDEBAR_OPENED,
  payload: isOpen,
});
export const setSidebarRoutes = (data) => ({
  type: actions.SET_SIDEBAR_ROUTES,
  payload: data,
});
export const setUserInfo = (data) => ({
  type: actions.SET_USER_INFO,
  payload: data,
});
export const initSystemInfo = () => ({
  type: actions.INIT_SYSTEM_INFO,
});
