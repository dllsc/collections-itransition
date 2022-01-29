import { useFormContext } from 'react-hook-form';
import { ICollectionForm, IItemField } from '../../components/CollectionForm/CollectionsForm.props';
import { EItemFieldType } from '../../components/CollectionForm/EItemFieldType';
import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import React from 'react';

export interface IItemFieldProps {
  readonly field: IItemField;
  readonly index: number;
  readonly remove: () => void;
}

export function createDefaultFieldFormValues(itemsCount: number, type: EItemFieldType): any[] {
  return Array(itemsCount).fill(createDefaultValueForType(type));
}

export function createDefaultValueForType(type: EItemFieldType): any {
  switch (type) {
    case EItemFieldType.DATE:
      return new Date().toJSON().slice(0, 10);
    case EItemFieldType.NUMBER:
      return 0;
    case EItemFieldType.STRING:
      return 'Default';
    default:
      throw new Error('Incorrect type');
  }
}

export function FieldForm(props: IItemFieldProps) {
  const { register, getValues, trigger, setValue } = useFormContext<ICollectionForm>();
  const updateValue = () => trigger();
  const updateFieldValuesAfterTypeChange = (type: EItemFieldType) => {
    const itemsCount = getValues().items.length;
    const newFieldFormValues = createDefaultFieldFormValues(itemsCount, type);
    setValue(`itemsFields.${props.index}.values`, newFieldFormValues);

    updateValue();
  };
  const createRadioWithType = (type: EItemFieldType) => {
    return <Radio radioGroup={props.field.id}
                  onClick={() => updateFieldValuesAfterTypeChange(type)}
                  {...register(`itemsFields.${props.index}.type`)}
                  checked={getValues().itemsFields[props.index].type === type}
                  value={type}/>;
  };

  return <Grid container
          wrap="nowrap"
          className="create-field-form-element">

        <TextField type="text"
                   {...register(`itemsFields.${props.index}.name`, { onBlur: updateValue })}
        style={{flexGrow:1}}
        />

        <RadioGroup style={{ flexDirection: 'row', flexWrap: 'nowrap', marginLeft: 10 }}>
          <FormControlLabel control={createRadioWithType(EItemFieldType.STRING)}
                            label="String"/>
          <FormControlLabel control={createRadioWithType(EItemFieldType.DATE)}
                            label="Date"/>
          <FormControlLabel control={createRadioWithType(EItemFieldType.NUMBER)}
                            label="Number"/>
        </RadioGroup>

        <Delete onClick={props.remove} style={{marginTop:13}}/>
    </Grid>;
}
