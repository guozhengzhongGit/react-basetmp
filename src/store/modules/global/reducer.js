import produce from 'immer';
import * as actions from './constants';

const initialState = {
  sidebarIsOpen: true,
};

const globalReducer = (state = initialState, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case actions.TOGGLE_SIDEBAR_OPENED:
        draftState.sidebarIsOpen = action.payload;
        break;
      default:
        break;
    }
  });
export default globalReducer;
