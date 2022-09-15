import { combineReducers } from '@reduxjs/toolkit';
import { reducer as calendarReducer } from '../slices/calendar';

export const rootReducer = combineReducers({
  calendar: calendarReducer,
});
