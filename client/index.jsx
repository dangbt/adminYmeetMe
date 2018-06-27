import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Router} from 'react-router-dom';
import routes from './router.jsx';
import App from './components/App/index.jsx';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory({basename: '/', forceRefresh: false});

ReactDOM.render((
  <Router history={history} >
    {routes}
  </Router>
), document.getElementById('root'));
