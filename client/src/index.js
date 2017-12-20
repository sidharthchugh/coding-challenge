import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
