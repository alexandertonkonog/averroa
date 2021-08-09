import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import habitat from "preact-habitat";

let _habitat = habitat(App);

_habitat.render({
  selector: '[data-widget-host="habitat"]',
  clean: true
});