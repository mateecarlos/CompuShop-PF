import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store';

ReactDOM.render(
  <Provider store={store}>
     <React.StrictMode>
         <BrowserRouter>
            <App />
         </BrowserRouter>
     </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

