import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/Login';
import { ReadCollection } from './pages/ReadCollection/ReadCollection';
import { CollectionsPage } from './pages/Collections/CollectionsPage';
import { ReadOneCollection } from './pages/ReadCollection/ReadOneCollection';
import { CollectionForm } from './pages/addCollection/collectionForm';
import { ReadFullCollection } from './pages/ReadCollection/ReadFullCollection';
import { CreateCollectionPage } from './pages/addCollection/CreateCollectionPage';

// localhost:4200/collection/read/1

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/collection/read/:page/:limit" element={<ReadFullCollection/>}/>
        <Route path="/collection/add" element={<CreateCollectionPage/>}/>
        <Route path="/collection/:id" element={<ReadOneCollection/>}/>
        <Route path="/" element={<div>lalalallalal</div>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
