import produce from 'immer';
import * as actions from './constants';
import { flattenRoute } from '@r/utils';
import AdminConfig from '@/config/adminConfig';

const initialState = {
  load: false,
  sidebarIsOpen: true,
  routes: [],
  flattenRoutes: [],
  theme: {
    themeStyle: AdminConfig.THEME_STYLE,
    layoutStyle: AdminConfig.LAYOUT_STYLE,
  },
  userInfo: {},
};

const globalReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case actions.TOGGLE_SIDEBAR_OPENED:
        draftState.sidebarIsOpen = action.payload;
        break;
      case actions.SET_SIDEBAR_ROUTES:
        draftState.load = true;
        draftState.routes = action.payload;
        draftState.flattenRoutes = flattenRoute(action.payload, true, false);
        break;
      case actions.SET_USER_INFO:
        draftState.userInfo = action.payload;
        break;
      default:
        break;
    }
  });
export default globalReducer;
