import { get } from '../../axios-instance';
import { useState } from 'react';
import { IItem } from './item.model';
import { CollectionItem } from '../../components/CollectionsItem/CollectionItem';

interface IItemsProps {
  readonly collectionId: number;
}


export function Items(props: IItemsProps) {
  const [items, setItems] = useState<any[]>([]);
  const fetchData = async () => {
    const response = await get<IItem[]>(`items/${props.collectionId}`);
    setItems(response);
  };

  return (
    <div>
      <h3>Items</h3>
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch items
        </button>
      </div>

      <div>
        {items && items.map((item, index) =>
          <CollectionItem name={item.name}
                          image={item.image}
                          id={item.id}
                          collectionId={item.collectionId}
                          child={<div></div>}
          />
          )}
      </div>
    </div>
  );
}
