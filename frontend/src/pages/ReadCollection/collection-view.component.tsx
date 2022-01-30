import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get } from '../../axios-instance';
import { ICollection } from './models';
import { ItemCard } from './item-card.component';
import { CollectionInfo } from './collection-info.component';
import { imageToBackground } from '../../utils/styles.utils';


export interface ICollectionViewContentParams {
  readonly collection: ICollection;
}

function CollectionViewContent({ collection }: ICollectionViewContentParams) {
  return <div className="collection-view" style={{
    backgroundImage: imageToBackground(collection.items[0].image)
  }}>
    <div className="collection-view__content">
      <CollectionInfo collection={collection}/>

      <div className="collection-view__items-hide-scroll-wrapper">
        <div className="collection-view__items">
          {collection.items.map((item, index) =>
            <ItemCard key={item.id}
                      item={item}
                      fields={collection.fields}
                      index={index}/>,
          )}
        </div>
      </div>
    </div>
  </div>;
}

export function CollectionView() {
  const params = useParams<{ id: string }>();
  const [collection, setCollection] = useState<ICollection>();

  useEffect(() => {
    get<ICollection>(`collection/one/${params.id}`).then(data => {
      setCollection(data);
    });
  }, []);

  if (!collection) {
    return <div>Loading...</div>;
  }

  return <CollectionViewContent collection={collection}/>;
}

