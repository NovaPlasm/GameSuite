import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './app';

render(
  <App />,
  document.getElementById('test') || document.createElement('div')
);
