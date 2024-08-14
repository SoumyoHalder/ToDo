import { configureStore } from '@reduxjs/toolkit';
import displayThemeReducer from './displayThemeSlice';
import themeReducer from './themeSlice';
import todosReducer from './todoslice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    theme: themeReducer,
    displayTheme: displayThemeReducer, 
  },
});

export default store;
