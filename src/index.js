import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { ContextProvider } from './Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FluentProvider theme={teamsLightTheme}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </FluentProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
