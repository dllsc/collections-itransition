import { Items } from '../Items/Items';
import { get } from '../../axios-instance';
import { useState } from 'react';
import { IItem } from '../Items/item.model';
import { MatButton, MatInput } from '../imports-material';
import { Collection } from '../../components/Collection/Collection';
import { ICollection } from '../../components/Collection/Collection.props';


const LocalCollectionID = localStorage.getItem('collectionID');

export function ReadCollection(){

  const [collection, setCollection] = useState<ICollection>();
  const fetchData = async () => {
    const response = await get<ICollection>(`collections/${LocalCollectionID}`);
    console.log(response);
    setCollection(response);
  };
  return <>
    <button className="fetch-button" onClick={fetchData}>Fetch</button>
    {collection && <Collection id={collection.id} name={collection.name} theme={collection.theme} description={collection.description}/>}
    {LocalCollectionID && <Items collectionId={parseInt(LocalCollectionID)}/>}
  </>
}
