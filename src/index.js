import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Routes, history } from 'utils';
import {Provider} from 'context';
import { RootStore } from 'stores';
import App from './App';

import './app.scss';

const value = new RootStore()

// temporary use event turbolinks until turbolinks unused
// document.addEventListener('DOMContentLoaded', () => {
ReactDOM.render(
  <Provider value={value}>
    <Router history={history}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
)
