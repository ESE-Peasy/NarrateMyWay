import { ThemeUpdatedAction } from '../types';

export enum THEME_ACTIONS {
  THEME_UPDATED_ACTION = 'THEME/THEME_UPDATED'
}

export const themeUpdated = (themeName: string): ThemeUpdatedAction => ({
  type: THEME_ACTIONS.THEME_UPDATED_ACTION,
  theme: {
    themeName
  }
});
