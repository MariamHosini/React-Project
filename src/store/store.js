import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import themeReducer from './themeSlice';
import spinnerReducer from './spinnerSlice';
import authReducer from './authSlice';


const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'] 
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    spinner: spinnerReducer,
    auth: persistedAuthReducer, 
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;