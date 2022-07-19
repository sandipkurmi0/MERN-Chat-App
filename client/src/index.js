import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from "./context/ChatProvider"
import { Provider } from 'react-redux';
import { store } from './app/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <ChatProvider>
    <BrowserRouter >
      <ChakraProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </ChatProvider>

);


