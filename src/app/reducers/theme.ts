import { handleActions } from 'redux-actions';
import { TodoActions } from 'app/actions';

const initialState = 0;

export const themeReducer = handleActions<any>(
  {
    [TodoActions.Type.TOGGLE_THEME]: (state) => {
      return !state;
    }
  },
  initialState
);
