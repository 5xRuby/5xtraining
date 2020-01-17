import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import '@fortawesome/fontawesome-free';

import App from './pages/App';

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  console.log('in hot');
  module.hot.accept('./pages/App.jsx', () => {
    const NextRootContainer = require('./pages/App.jsx').default;
    render(NextRootContainer);
  });
}
