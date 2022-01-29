import { ICollectionForm, IItemField } from '../ReadCollection/models';
import { useFormContext } from 'react-hook-form';
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { EItemFieldType } from '../../enums/item-field.enum';

function getInputTypeByFieldType(type: EItemFieldType): 'text' | 'number' | 'date' {
  switch (type) {
    case EItemFieldType.DATE:
      return 'date';
    case EItemFieldType.NUMBER:
      return 'number';
    case EItemFieldType.STRING:
      return 'text';
  }
}

interface IItemFormFieldProps {
  readonly indexOfField: number;
  readonly indexOfItem: number;
  readonly field: IItemField;
}

export function ItemFormField({ indexOfItem, indexOfField, field }: IItemFormFieldProps) {
  const { register, trigger } = useFormContext<ICollectionForm>();
  const itemFieldControl = register(
    `itemsFields.${indexOfField}.values.${indexOfItem}`,
    { onChange: () => trigger() },
  );

  return <Grid container
               item
               xs={6}
               key={field.id}
               className="item__field">
    <TextField style={{ paddingRight: 10, flexGrow: 1 }}
               type={getInputTypeByFieldType(field.type)}
               label={field.name}
               {...itemFieldControl}/>
  </Grid>;
}
