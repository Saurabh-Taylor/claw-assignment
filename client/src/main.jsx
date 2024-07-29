import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux";

import { QueryClientProvider , QueryClient } from "@tanstack/react-query";
import store from './redux/store.js'
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <QueryClientProvider client={queryClient} >
    
    <App />
    <Toaster/>
  </QueryClientProvider>
  </Provider>
)
