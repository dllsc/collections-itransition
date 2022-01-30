import React from 'react';
import './App.css';
import { Redirect, Route, Router } from 'react-router-dom';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/Login';
import { CollectionView } from './pages/ReadCollection/collection-view.component';
import { CollectionsListComponent } from './pages/ReadCollection/collections-list.component';
import { appHistory } from './utils/history.utils';
import { GuardedRouteComponent } from './components/GuardedRoute/guarded-route.component';
import { CollectionForm } from './pages/addCollection/collection-form.component';
import { EditCollectionForm } from './pages/addCollection/edit-collection-form.component';

export function App() {
  return <Router history={appHistory}>
    <GuardedRouteComponent path="/collection/add"
                           component={CollectionForm}/>
    <GuardedRouteComponent path="/collection/edit/:id"
                           component={EditCollectionForm}/>
    <Route path="/collection/all/:page/:limit"
           component={CollectionsListComponent}/>
    <Route path="/collection/read/:id"
           exact
           component={CollectionView}/>
    <Route path="/"
           exact
           component={() => <Redirect to="/collection/all/0/0"/>}/>
    <Route path="/login"
           exact
           component={Login}/>
    <Route path="/registration"
           exact
           component={Registration}/>
  </Router>;
}
