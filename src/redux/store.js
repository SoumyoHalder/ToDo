import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import displayThemeReducer from './displayThemeSlice';
import themeReducer from './themeSlice';
import todosReducer from './todoslice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create persisted reducers
const persistedTodosReducer = persistReducer(persistConfig, todosReducer);
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedDisplayThemeReducer = persistReducer(persistConfig, displayThemeReducer);

// Configure store with middleware
const store = configureStore({
  reducer: {
    todos: persistedTodosReducer,
    theme: persistedThemeReducer,
    displayTheme: persistedDisplayThemeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
        ],
        ignoredPaths: ['register'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
