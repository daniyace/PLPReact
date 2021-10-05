import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';

ReactDOM.render(
  <React.StrictMode>
    <link rel='preconnect' href='https://fonts.gstatic.com' />
    <link
      href='https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Ubuntu+Mono:wght@400;700&display=swap'
      rel='stylesheet'
    />
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
