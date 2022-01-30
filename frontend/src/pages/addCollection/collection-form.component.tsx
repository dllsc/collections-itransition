import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { MatButton } from '../imports-material';
import { ErrorMessage } from '@hookform/error-message';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { post } from '../../axios-instance';
import './collectionForm.styles.css';
import { ICollection, ICollectionForm, ICollectionFormDto } from '../ReadCollection/models';
import { EItemFieldType } from '../../enums/item-field.enum';
import { createDefaultFieldForm, FieldFormList } from './field-form-list.component';
import { required } from './item-form.component';
import { createDefaultItemForm, ItemFormsList } from './item-forms-list';
import MDEditor from '@uiw/react-md-editor';
import Button from '@mui/material/Button';
import { appHistory } from '../../utils/history.utils';

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
    id: collection.id,
    name: collection.name,
    theme: collection.theme,
    description: collection.description,
    items: collection.items.map(item => ({
      id: item.id,
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

function collectionFormToFormData(collectionForm: ICollectionForm): FormData {
  const images = collectionForm.items.map(item => item.image[0] || new File([], 'empty'));
  const jsonPartOfCollectionForm: ICollectionFormDto = {
    ...collectionForm,
    items: collectionForm.items.map(({ name }) => ({ name })),
  };
  const collectionFormData = new FormData();

  collectionFormData.append('collection', JSON.stringify(jsonPartOfCollectionForm));
  images.forEach((imageFile) => collectionFormData.append(`images`, imageFile));


  return collectionFormData;
}

async function saveCollection(collectionForm: ICollectionForm) {
  const savedCollection = await post<FormData, { id: number }>('collection', collectionFormToFormData(collectionForm));

  appHistory.push(`/collection/read/${savedCollection.id}`);
}

function ThemeControl() {
  const { getValues, register } = useFormContext<ICollectionForm>();

  return <FormControl fullWidth>
    <InputLabel id="select-label">Theme</InputLabel>
    <Select
      defaultValue={getValues().theme}
      labelId="select-label"
      label="Theme"
      {...register('theme', { required: true })}>
      <MenuItem value="Alcohol">Alcohol</MenuItem>
      <MenuItem value="Book">Book</MenuItem>
    </Select>
  </FormControl>;
}

function DescriptionEditor() {
  const { setValue, getValues } = useFormContext<ICollectionForm>();
  const [markdown, setMarkdown] = useState<string>(getValues().editCollection?.description || '');

  useEffect(() => {
    setValue('description', markdown);
  }, [markdown]);

  return <div className="collection-description-editor">
    <MDEditor style={{ width: '100%' }}
              value={markdown}
              onChange={value => value && setMarkdown(value)}/>
  </div>;
}

export function CollectionForm(props: ICollectionFormProps) {
  const formHook = useForm<ICollectionForm>({
    defaultValues: props.initialEditValue
      ? createDefaultEditCollectionForm(props.initialEditValue)
      : createDefaultCollectionForm(),
  });
  const { register, handleSubmit, formState: { errors }, getValues } = formHook;

  return <FormProvider {...formHook}>
    <form onSubmit={handleSubmit(saveCollection)}
          className="form">
      <div className="form-container">
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
              <ThemeControl/>
            </Grid>
          </Grid>

          <DescriptionEditor/>

          <FieldFormList/>
        </div>

        <ItemFormsList/>
        <Button variant="contained"
                type="submit">
          Save Collection
        </Button>

        <div style={{ height: 150 }}/>
      </div>
    </form>
  </FormProvider>;
}
