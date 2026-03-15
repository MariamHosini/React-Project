import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./components/scrollTop/scroltop";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop />
    <Provider store={store}>
      < PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>

  </React.StrictMode>
);
