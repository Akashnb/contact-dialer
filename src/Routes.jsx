import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./scenes/dashboard/Dashboard";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      {/* <Route path="*" component={NotFound} /> */}
    </Switch>
  </BrowserRouter>
);

export default Routes;
