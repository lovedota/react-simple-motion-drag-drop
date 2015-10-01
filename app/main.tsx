import 'babel-core/polyfill';

import React from 'react';
import DashboardActions from './actions/dashboard-actions';
import DashboardPage from './components/dashboard/dashboard-page';

DashboardActions.getProducts();

React.render(<DashboardPage />, document.getElementById('app-content'));
