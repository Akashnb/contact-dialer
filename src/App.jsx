import React from 'react';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-block-ui/style.css';
import './assets/styles/app.scss';
import reduxStore from './store';
import Routes from './Routes';

const App = () => (
  <div className="App">
    <Provider store={reduxStore}>
      <Routes />
    </Provider>
  </div>
);

export default App;
