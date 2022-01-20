import { CollectionsForm } from '../../components/CollectionForm/CollectionsForm';
import { CollectionItemForm } from '../../components/CollectionItemForm/CollectionItemForm';
import { useState } from 'react';
import { Items } from '../Items/Items';

export function EditCollection(){

  const [collectionID, setCollectionID] = useState<string>();

  const addItem = () => {
    const i = localStorage.getItem('collectionID');
    if(i){
      setCollectionID(i)
    }
  };

  return <div>
    <CollectionsForm mode={'add'}/>
    <button onClick={addItem}>+Item</button>
    { collectionID && <CollectionItemForm collectionId={parseInt(collectionID)}/>}
    {collectionID && <Items collectionId={parseInt(collectionID)}/>}
  </div>

}
