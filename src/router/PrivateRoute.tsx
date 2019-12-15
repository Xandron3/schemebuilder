import React, {FC, ComponentProps} from 'react';
import {Route, Redirect} from 'react-router-dom';

import {getToken} from 'data';

const PrivateRoute: FC<ComponentProps<typeof Route>> = (props) => (
  getToken() ? <Route {...props} /> : <Redirect to="/login" />
)

export default PrivateRoute;
