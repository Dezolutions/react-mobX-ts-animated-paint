import React from 'react';
import ReactDOM from 'react-dom';
import './sass/index.scss';
import App from './App';
import { StoresProvider, stores } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <StoresProvider value={stores}>
      <App />
    </StoresProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


