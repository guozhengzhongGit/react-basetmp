import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Route, Switch } from 'react-router-dom';

function TransitionMain({ children }) {
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup className="layout__route">
          <CSSTransition
            key={location.pathname}
            classNames="layout__route"
            timeout={300}
          >
            <Switch location={location}>{children}</Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default TransitionMain;
