import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import themeReducer from './themeSlice';
import spinnerReducer from './spinnerSlice';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated',"wishList"] 
};
const cartPersistConfig = {
  key: 'cart',
  storage,
  whitelist: ['productData', 'productNumbers'] 
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);


const store = configureStore({
  reducer: {
    theme: themeReducer,
    spinner: spinnerReducer,
    auth: persistedAuthReducer, 
    cart: persistedCartReducer, 
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;