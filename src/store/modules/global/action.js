import * as actions from './constants';
export const toggleSidebarOpened = (isOpen) => ({
  type: actions.TOGGLE_SIDEBAR_OPENED,
  payload: isOpen,
});
export const setSidebarRoutes = (data) => ({
  type: actions.SET_SIDEBAR_ROUTES,
  payload: data,
});
