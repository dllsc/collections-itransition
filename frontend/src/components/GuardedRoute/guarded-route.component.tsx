import React, { Component, ComponentType, createElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../../utils/login.utils';

export interface IGuardedRouteProps {
  readonly path: string;
  readonly component: ComponentType<any>;
  readonly exact?: boolean;
}

export class GuardedRouteComponent extends Component<IGuardedRouteProps, any> {
  render() {
    return <Route path={this.props.path}
                  exact={true}
                  render={props => isLoggedIn() ?
                    createElement(this.props.component, props)
                    : <Redirect to="/login"/>
                  }/>;
  }
}
