import { IAddItemFormModel, ICollectionForm } from '../../components/CollectionForm/CollectionsForm.props';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { createDefaultValueForType } from './field-form.component';
import { MatButton } from '../imports-material';
import { ItemForm } from './item-form.component';
import React from 'react';

export function createDefaultItemForm(): IAddItemFormModel {
  return {
    name: 'Initial name',
    image: new DataTransfer().files,
  };
}

export function ItemFormsList() {
  const { append, fields: itemForms, remove } = useFieldArray<ICollectionForm>({ name: 'items' });
  const { setValue, getValues } = useFormContext<ICollectionForm>();
  const itemsFieldsFormArray = useFieldArray<ICollectionForm>({ name: 'itemsFields' });
  // const itemsFieldsWithType = itemsFieldsFormArray.fields as IItemField[];

  // console.log(itemsFieldsWithType);

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

  return <>    <MatButton onClick={addInput}> + ITEM </MatButton>

    {itemForms.map((item, index) => <ItemForm key={item.id}
                                              index={index}
                                              remove={() => removeItem(index)}
                                              single={itemForms.length === 1}/>)}
  </>;
}
