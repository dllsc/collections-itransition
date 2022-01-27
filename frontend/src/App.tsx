import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/Login';
import { CollectionView } from './pages/ReadCollection/CollectionView';
import { CollectionsPage } from './pages/ReadCollection/CollectionsPage';
import { CreateCollectionPage } from './pages/addCollection/CreateCollectionPage';
import { appHistory } from './utils/history.utils';
import { GuardedRouteComponent } from './components/GuardedRoute/guarded-route.component';

// localhost:4200/collection/read/1

export function App() {
  return (
    <Router history={appHistory}>
      <Route path="/collection/read/:page/:limit"
             component={CollectionsPage}/>
      <GuardedRouteComponent path="/collection/add"
                             component={CreateCollectionPage}/>
      <Route path="/collection/:id"
             exact={true}
             component={CollectionView}/>
      <Route path="/"
             exact={true}
             component={() => <div>lalalallalal</div>}/>
      <Route path="/login"
             exact={true}
             component={Login}/>
      <Route path="/registration"
             component={Registration}/>
    </Router>
  );
}
