import { ErrorMessage } from '@hookform/error-message';
import { SubmitHandler, useForm } from 'react-hook-form';
import { post } from '../../axios-instance';
import { MatButton, MatInput } from '../../pages/imports-material';
import React from 'react';
import { REQUIRE_MESSAGE } from '../../constants/constants';
import {randomString} from "./RandomString";


interface ItemForm {
  name: string;
  image: FileList;
}

interface IAddItemProps {
  collectionId: number;
}


const newItemFormData = (data:ItemForm, props:IAddItemProps)=>{
  const newItemFormData = new FormData();
  const imageFile = data.image[0];

  newItemFormData.append('name', data.name);
  newItemFormData.append('image', imageFile, `${randomString()}.${imageFile.name}`);
  newItemFormData.append('collectionID', props.collectionId.toString());

  return newItemFormData;
}


export function CollectionItemForm(props: IAddItemProps) {

  const { register, handleSubmit, formState: { errors }, setError } = useForm<ItemForm>();

  const onSubmit: SubmitHandler<ItemForm> = data => {
    console.log(props);
    post<FormData, any>('items/post', newItemFormData(data, props))
      .then(e => console.log(e)).catch(error => {
      if (error.response) {
        setError('name', { type: error, message: error.response.data.message });
      }
    });

  };

  return <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1>Set Item</h1>
        <MatInput {...register('name', { required: REQUIRE_MESSAGE })} label="name item"/>
        <ErrorMessage errors={errors} name="name" as="p"/>
        <MatInput type="file" {...register('image', { required: REQUIRE_MESSAGE })} label="imageUrl"/>
        <MatButton type="submit">Add Item</MatButton>
      </form>;
}
