import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/Login';
import { ReadCollection } from './pages/ReadCollection/ReadCollection';
import { CollectionsPage } from './pages/Collections/CollectionsPage';
import { EditCollection } from './pages/EditCollection/EditCollection';
import { AddCollection } from './pages/addCollection/addCollection';
import { Read } from './pages/ReadCollection/Read';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/collections/read" element={<Read/>}/>
        <Route path="/collections/add" element={<AddCollection/>}/>
        <Route path="/collections" element={<CollectionsPage/>}/>
        <Route path="/collection/items" element={<ReadCollection/>}/>
        <Route path="/" element={<div>lalalallalal</div>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
