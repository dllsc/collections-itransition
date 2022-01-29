import { EItemFieldType } from '../../enums/item-field.enum';
import { useFormContext } from 'react-hook-form';
import { Fab, Grid, IconButton, InputLabel, TextField } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import AddIcon from '@mui/icons-material/Add';
import { Delete } from '@mui/icons-material';
import React from 'react';
import { REQUIRE_MESSAGE } from '../../constants/constants';
import { ICollectionForm } from '../ReadCollection/models';

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
    <Grid container>
      <Grid container item
            xs={12}
            className="item__name">

          <TextField   {...register(`items.${props.index}.name`, required)} label="name item" style={{flexGrow:1}}/>
          <ErrorMessage errors={errors}
                        name={`items.${props.index}.name`}
                        as="p"/>


        <IconButton
          style={{marginLeft:12}}
          onClick={props.remove}
          disabled={props.single}>
          <Delete/>
        </IconButton>
      </Grid>
      <Grid item
            xs={12}>

        <Grid container>
          {getValues().itemsFields.map((field, indexOfField) =>
            <Grid container item
                  xs={6}
                  key={field.id}
                  className="item__field"
            >
              <TextField style={{paddingRight:10, flexGrow:1}}
                         type={getInputTypeByFieldType(field.type)}
                         label={field.name}
                         {...register(`itemsFields.${indexOfField}.values.${props.index}`, { onChange: () => trigger() })}/>
            </Grid>,
          )}
        </Grid>

      </Grid>




    </Grid>

    <div>
      <label htmlFor={`items.${props.index}.image`}>
        <TextField type="file" {...register(`items.${props.index}.image`, required)}
                   style={{ display: 'none' }}
                   id={`items.${props.index}.image`}
        />
        <Fab
          size={"large"}
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
  </div>;
}
