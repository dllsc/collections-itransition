import React from 'react';
import { ICollection } from './Collection.props';




export function Collection(collection: ICollection) {
  return (
    <div className="Collection">
      <h3> Collection {collection.name} </h3>
      <div className="details">
        <p>Тема: {collection.theme}</p>
        <p>Описание: {collection.description}</p>
      </div>
    </div>
  );
}
