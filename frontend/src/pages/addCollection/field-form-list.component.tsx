import { EItemFieldType } from '../../components/CollectionForm/EItemFieldType';
import { ICollectionForm, IItemField } from '../../components/CollectionForm/CollectionsForm.props';
import { randomString } from '../../components/CollectionItemForm/RandomString';
import { createDefaultFieldFormValues, FieldForm } from './field-form.component';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { MatButton } from '../imports-material';
import React from 'react';
import { Button } from '@mui/material';

type WithId<TInitial> = TInitial & { id: string };

export function createDefaultFieldForm(itemsCount: number, type: EItemFieldType): IItemField {
  return {
    id: randomString(),
    name: 'test field',
    type,
    values: createDefaultFieldFormValues(itemsCount, type),
  };
}

export function FieldFormList() {
  const fieldsFormArray = useFieldArray<ICollectionForm>({ name: 'itemsFields' });
  const fieldsWithType = fieldsFormArray.fields as WithId<IItemField>[];
  const itemsFormArray = useFormContext<ICollectionForm>();

  const appendNewField = () => {
    const itemsCount = itemsFormArray.getValues().items.length;
    const newField = createDefaultFieldForm(itemsCount, EItemFieldType.STRING);
    fieldsFormArray.append(newField);
  };

  return <>
    {fieldsWithType.map((field, index) =>
      <FieldForm field={field}
                 index={index}
                 key={field.id}
                 remove={() => fieldsFormArray.remove(index)}/>,
    )}

    <Button onClick={appendNewField}> CREATE FIELD </Button>
  </>;
}
