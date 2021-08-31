import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <HashRouter hashType="noslash" basename="/">
    <App />
  </HashRouter>,
  document.getElementById('widget-1bit')
);
