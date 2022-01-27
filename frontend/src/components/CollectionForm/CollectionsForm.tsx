import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MatButton, MatInput } from '../../pages/imports-material';
import { axiosInstance, post} from '../../axios-instance';
import { ErrorMessage } from '@hookform/error-message';
import { TextareaAutosize } from '@mui/material';
import { REQUIRE_MESSAGE } from '../../constants/constants';
import { ICollectionForm, CollectionFormProps } from './CollectionsForm.props';
import { CollectionItemForm } from '../CollectionItemForm/CollectionItemForm';
import { TOKEN_LOCAL_STORAGE_KEY } from '../../utils/login.utils';

type responseDataPost = {
  description: string;
  id: number;
  name: string;
  theme: string;
}

export function CollectionsForm({mode}:CollectionFormProps) {

  const path = {
    add: 'collections/post',
    edit: '...'
  }
  let path1:string;
  switch (mode){
    case 'edit': {
      path1 = path.edit
      break;
    }
    case 'add': {
      path1 = path.add
      break;
    }
    default: {
      console.log('Invalid');
    }
  }
  const { register, handleSubmit, formState: { errors }, setError } = useForm<ICollectionForm>();

  const onSubmit: SubmitHandler<ICollectionForm> = data => {
    post<ICollectionForm, responseDataPost>(path1,data).then(r => localStorage.setItem('collectionID', r.id.toString())).catch((error => {
      if (error.response) {
        setError('name', { type: error, message: error.response.data.message });
      }
    }))
  };


  return (<>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1>Collections</h1>
        <MatInput {...register('name',
          { required: REQUIRE_MESSAGE })}
                  label="name collection"/>
        <ErrorMessage errors={errors} name="name" as="p"/>
        <TextareaAutosize {...register('description',
          { required: REQUIRE_MESSAGE })}
                          style={{ width: 170 }}  />
        <MatInput {...register('theme', { required: REQUIRE_MESSAGE, })} label="theme"/>
        <MatButton type="submit">Add Collection</MatButton>
      </form>







<CollectionItemForm collectionId={1}/>
      </>
  );
}
