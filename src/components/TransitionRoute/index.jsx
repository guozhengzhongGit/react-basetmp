import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom';

import './style.css';

function TransitionRoute({ children }) {
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            className="routeAnimation"
            timeout={300}
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default TransitionRoute;
