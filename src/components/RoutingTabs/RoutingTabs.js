import React, { Suspense } from 'react';
import {
  generatePath,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import { Tabs } from '@material-ui/core';
import LoadingBackdrop from '../LoadingBackdrop';

function RoutingTabs({ children }) {
  const match = useRouteMatch();
  const history = useHistory();
  const routes = [];

  const preparedChildren = React.Children.map(children, child => {
    // Prepares routes for the tabs.
    if (child.props.component) {
      routes.push({
        path: child.props.path,
        exact: child.props.exact,
        component: child.props.component,
      });
    }

    // Adds value prop for the tab highlight.
    return React.cloneElement(child, {
      value: generatePath(child.props.path, match.params),
    });
  });

  return (
    <>
      <Tabs value={history.location.pathname}>{preparedChildren}</Tabs>
      <Suspense fallback={<LoadingBackdrop />}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              // First tab will always be the root page.
              exact={index === 0}
              key={index}
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </Suspense>
    </>
  );
}

export default RoutingTabs;
