import "bootstrap-sass/assets/stylesheets/_bootstrap.scss";
import "babel-core/polyfill";

/* tslint:disable:no-unused-variable */
import React from "react";
/* tslint:enable:no-unused-variable */
import ReactDOM from "react-dom";

import DashboardActions from "./actions/dashboard-actions";
import DashboardPage from "./components/dashboard/dashboard-page";

DashboardActions.getProducts();

ReactDOM.render(<DashboardPage />, document.getElementById("app-content"));
