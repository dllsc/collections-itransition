import { useFieldArray, useFormContext } from 'react-hook-form';
import { createDefaultValueForType } from './field-form.component';
import { ItemForm } from './item-form.component';
import React from 'react';
import { IAddItemFormModel, ICollectionForm } from '../ReadCollection/models';
import { Button } from '@mui/material';

export function createDefaultItemForm(): IAddItemFormModel {
  return {
    id: Math.random(),
    name: 'Initial name',
    image: new DataTransfer().files,
  };
}

export function ItemFormsList() {
  const { append, fields: itemForms, remove } = useFieldArray<ICollectionForm>({ name: 'items' });
  const { setValue, getValues } = useFormContext<ICollectionForm>();

  const addInput = () => {
    append(createDefaultItemForm());
    setValue('itemsFields', getValues().itemsFields.map(field => ({
      ...field,
      values: [...field.values, createDefaultValueForType(field.type)],
    })));
  };

  const removeItem = (index: number) => {
    remove(index);
    setValue('itemsFields', getValues().itemsFields.map(field => ({
      ...field,
      values: [...field.values.slice(0, index), ...field.values.slice(index + 1)],
    })));
  };

  return <>
    {itemForms.map((item, index) => <ItemForm key={item.id}
                                              index={index}
                                              remove={() => removeItem(index)}
                                              single={itemForms.length === 1}/>)}
    <Button onClick={addInput}> + ITEM </Button>
  </>;
}
