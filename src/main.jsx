import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import rootReducer from './Reducer/index.js';


export const store = configureStore({
  reducer:rootReducer,
});


createRoot(document.getElementById('root')).render(
    <Provider store = {store}>
    <BrowserRouter>
      <App />
      <ToastContainer limit={1} />
    </BrowserRouter>
    </Provider>


)
