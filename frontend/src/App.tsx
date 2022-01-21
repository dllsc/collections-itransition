import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/Login';
import { ReadCollection } from './pages/ReadCollection/ReadCollection';
import { CollectionsPage } from './pages/Collections/CollectionsPage';
import { Read } from './pages/ReadCollection/Read';
import { CollectionForm } from './pages/addCollection/collectionForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/collection/read" element={<Read/>}/>
        <Route path="/collection/add" element={<CollectionForm/>}/>
        <Route path="/collection" element={<CollectionsPage/>}/>
        <Route path="/collection/items" element={<ReadCollection/>}/>
        <Route path="/" element={<div>lalalallalal</div>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
