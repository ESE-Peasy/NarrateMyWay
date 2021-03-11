import { Theme, ThemeUpdatedAction, ThemeAction } from '../types';
import { THEME_ACTIONS } from './actions';

export const currentTheme: Theme = { themeName: 'default' };

function themeReducer(state: Theme = currentTheme, action: ThemeAction) {
  switch (action.type) {
    case THEME_ACTIONS.THEME_UPDATED_ACTION: {
      const { theme } = action as ThemeUpdatedAction;
      return theme;
    }
    default:
      return state;
  }
}

export default themeReducer;
