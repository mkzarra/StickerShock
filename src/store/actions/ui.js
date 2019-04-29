import { UI_START_LOADING, UI_STOP_LOADING } from './types';

export const uiStartLoading = () => ({ type: UI_START_LOADING });
export const uiStopLoading = () => ({ type: UI_STOP_LOADING });