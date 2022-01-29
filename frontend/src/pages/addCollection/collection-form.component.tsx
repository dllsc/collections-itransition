import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { MatButton } from '../imports-material';
import { ErrorMessage } from '@hookform/error-message';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material';
import { ICollectionForm, ICollectionFormDto } from '../../components/CollectionForm/CollectionsForm.props';
import { post } from '../../axios-instance';
import './collectionForm.styles.css';
import { ICollection } from '../ReadCollection/models';
import { EItemFieldType } from '../../components/CollectionForm/EItemFieldType';
import { createDefaultFieldForm, FieldFormList } from './field-form-list.component';
import { required } from './item-form.component';
import { createDefaultItemForm, ItemFormsList } from './item-forms-list';

function createDefaultCollectionForm(): ICollectionForm {
  return {
    name: 'My new collection',
    description: 'This is collection of ...',
    theme: 'Alcohol',
    items: [createDefaultItemForm()],
    itemsFields: [createDefaultFieldForm(1, EItemFieldType.STRING)],
  };
}

export interface ICollectionFormProps {
  readonly initialEditValue?: ICollection;
}

function createDefaultEditCollectionForm(collection: ICollection): ICollectionForm {
  return {
    ...collection,
    items: collection.items.map(item => ({
      name: item.name,
      image: new DataTransfer().files,
    })),
    itemsFields: collection.fields.map(field => ({
      id: field.id.toString(),
      name: field.name,
      type: field.type,
      values: field.values.split(','),
    })),
    editCollection: collection,
  };
}

export function CollectionForm(props: ICollectionFormProps) {
  const formControl = useForm<ICollectionForm>({
    defaultValues: props.initialEditValue
      ? createDefaultEditCollectionForm(props.initialEditValue)
      : createDefaultCollectionForm(),
  });
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = formControl;

  const onSubmit: SubmitHandler<ICollectionForm> = (collectionForm: ICollectionForm) => {
    const images = getValues().items.map(item => item.image[0]);
    const jsonPartOfCollectionForm: ICollectionFormDto = {
      ...collectionForm,
      items: collectionForm.items.map(({ name }) => ({ name })),
    };
    const collectionFormData = new FormData();

    collectionFormData.append('collection', JSON.stringify(jsonPartOfCollectionForm));
    images.forEach((imageFile, index) => collectionFormData.append(`images`, imageFile));

    post<FormData, any>('collection', collectionFormData).then(console.log);
  };

  return <FormProvider {...formControl}>
    <form onSubmit={handleSubmit(onSubmit)}
          className="form">
      <h1>Create Collection</h1>

      {/*<pre>*/}
      {/*  {JSON.stringify(getValues(), null, 2)}*/}
      {/*</pre>*/}

      <div className="collection-description">
        <Grid container>
          <Grid item
                flexGrow={1}>
            <TextField {...register('name', required)} fullWidth
                       label="name collection"/>
            <ErrorMessage errors={errors}
                          name="name"
                          as="p"/></Grid>
          <Grid item
                xs={1}/>
          <Grid item
                flexGrow={1}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Theme</InputLabel>
              <Select
                labelId="select-label"
                label="Theme"
                {...register('theme', { required: true })}
              >
                <MenuItem value="Alcohol">Alcohol</MenuItem>
                <MenuItem value="Book">Book</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item
              container>
          <TextareaAutosize
            className="collection-description__textarea"
            style={{ flexGrow: 1 }} {...register('description', required)}
                            minRows={8}/>
        </Grid>


        <FieldFormList/>

      </div>
      <ItemFormsList/>
      <MatButton type="submit">
        Save Collection
      </MatButton>
    </form>
  </FormProvider>;
}
