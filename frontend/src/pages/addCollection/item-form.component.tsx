import { EItemFieldType } from '../../components/CollectionForm/EItemFieldType';
import { useFormContext } from 'react-hook-form';
import { ICollectionForm } from '../../components/CollectionForm/CollectionsForm.props';
import { Fab, Grid, IconButton, InputLabel, TextField } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import AddIcon from '@mui/icons-material/Add';
import { Delete } from '@mui/icons-material';
import React from 'react';
import { REQUIRE_MESSAGE } from '../../constants/constants';

interface IAddItemFormProps {
  readonly index: number;
  readonly remove: () => void;
  readonly single: boolean;
}

export const required = { required: REQUIRE_MESSAGE };

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

export function ItemForm(props: IAddItemFormProps) {
  const { register, formState: { errors }, getValues, trigger } = useFormContext<ICollectionForm>();


  return <div className="item">
    <div style={{ justifyItems: 'right' }}>

    </div>

    <Grid container>
      <Grid item
            xs={2}>
        <div>
          <TextField {...register(`items.${props.index}.name`, required)} label="name item"/>
          <ErrorMessage errors={errors}
                        name={`items.${props.index}.name`}
                        as="p"/>
        </div>
        <div>
          <label htmlFor={`items.${props.index}.image`}>
            <TextField type="file" {...register(`items.${props.index}.image`, required)}
                       style={{ display: 'none' }}
                       id={`items.${props.index}.image`}/>
            <Fab
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AddIcon/> Upload photo
            </Fab>
            <ErrorMessage errors={errors}
                          name={`items.${props.index}.image`}
                          as="p"/>
          </label>
        </div>

      </Grid>
      <Grid item
            xs={1}/>
      <Grid item
            xs={8}>

        <Grid container>
          {getValues().itemsFields.map((field, indexOfField) =>
            <Grid item
                  xs={4}
                  key={field.id}>
              <InputLabel variant="standard">{field.name}</InputLabel>
              <TextField type={getInputTypeByFieldType(field.type)}
                         {...register(`itemsFields.${indexOfField}.values.${props.index}`, { onChange: () => trigger() })}/>
            </Grid>,
          )}
        </Grid>

      </Grid>
      <Grid item
            xs={1}>
        <IconButton
          onClick={props.remove}
          disabled={props.single}>
          <Delete/>
        </IconButton>
      </Grid>
    </Grid>


  </div>;
}
