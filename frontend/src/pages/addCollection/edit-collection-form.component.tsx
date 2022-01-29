import { useEffect, useState } from 'react';
import { ICollection } from '../ReadCollection/models';
import { CollectionForm } from './collection-form.component';
import { get } from '../../axios-instance';
import { useParams } from 'react-router-dom';

export function EditCollectionForm() {
  const params = useParams<{ id: string }>();

  const [ collection, setCollection ] = useState<ICollection | null>(null);

  useEffect(() => {
    get<ICollection>(`collection/one/${params.id}`)
      .then(fetchedCollected => setCollection(fetchedCollected));
  }, []);

  return collection && <CollectionForm initialEditValue={collection}/>;
}
