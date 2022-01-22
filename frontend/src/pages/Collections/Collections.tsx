import { axiosInstance } from '../../axios-instance';
import React, { ReactChild, ReactNode, useState } from 'react';
import { MatButton } from '../imports-material';
import { Link } from 'react-router-dom';
import { Collection } from '../../components/Collection/Collection';
import { ICollection } from '../../components/Collection/Collection.props';


export function Collections() {
  const [collections, setCollections] = useState<ICollection[]>([]);


  const fetchData = async () => {
    const response = await axiosInstance.get('collection');
    setCollections(response.data);
  };

  return (
    <div>

      <button onClick={fetchData}>Fetch Collections</button>

      <div>
        {collections &&
          collections.map((collection, index) => {
            return (
              <div className="collections" key={index}>
                <Collection id={collection.id} name={collection.name} theme={collection.theme}
                            description={collection.description}/>
                <button onClick={() => localStorage.setItem('collectionID', collection.id.toString())}> add id to
                  localStorage
                </button>
                <MatButton>Delete</MatButton>
                <MatButton>Edit</MatButton>
                <Link to={{ pathname: '/collection/items' }}><MatButton>Read</MatButton></Link>
              </div>
            );
          })
        }

      </div>
    </div>
  );
}
