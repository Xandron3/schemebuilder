import React, {FC} from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import App from 'modules/app';
import LoginPage from 'modules/login/LoginPage';
import MySchemesPage from 'modules/schemes/MySchemesPage';
import CreateSchemePage from 'modules/schemes/CreateSchemePage';
import ViewSchemePage from 'modules/schemes/ViewSchemePage';
import EditSchemePage from 'modules/schemes/EditSchemePage';

const AppRouter: FC = () => (
  <BrowserRouter>
    <App>
      <Switch>
        <Route path="/login" component={LoginPage} exact />

        <PrivateRoute path="/schemes/my" component={MySchemesPage} exact />
        <PrivateRoute path="/schemes/my/:id" component={ViewSchemePage} exact />
        <PrivateRoute path="/schemes/edit" component={EditSchemePage} exact />
        <PrivateRoute path="/schemes/create" component={CreateSchemePage} exact />

        <Redirect to="/schemes/my" />
      </Switch>
    </App>
  </BrowserRouter>
);

export default AppRouter;
