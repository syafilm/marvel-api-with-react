import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Loading } from 'components';
import { Home } from 'pages';

const Routes = () => {
  return(
    <React.Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={'/'}>
          <Home />
        </Route>
      </Switch>
    </React.Suspense>
  );
};

export default Routes;