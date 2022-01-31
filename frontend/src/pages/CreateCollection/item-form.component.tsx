import { useFormContext } from 'react-hook-form';
import { Grid, IconButton, TextField } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { Delete } from '@mui/icons-material';
import React from 'react';
import { REQUIRE_MESSAGE } from '../../constants/constants';
import { ICollectionForm } from '../ReadCollection/models';
import { ImagePreview } from './image-preview.component';
import { ItemFormField } from './item-form-field.component';

interface IAddItemFormProps {
  readonly index: number;
  readonly remove: () => void;
  readonly single: boolean;
}

export const required = { required: REQUIRE_MESSAGE };

export function ItemForm(props: IAddItemFormProps) {
  const { register, formState: { errors }, getValues } = useFormContext<ICollectionForm>();

  return <div className="item">
    <Grid container>
      <Grid container
            item
            xs={12}
            className="item__name">
        <TextField   {...register(`items.${props.index}.name`, required)} label="name item"
                     style={{ flexGrow: 1 }}/>
        <ErrorMessage errors={errors}
                      name={`items.${props.index}.name`}
                      as="p"/>

        <IconButton
          style={{ marginLeft: 12 }}
          onClick={props.remove}
          disabled={props.single}>
          <Delete/>
        </IconButton>
      </Grid>
      <Grid item
            xs={12}>

        <Grid container>
          {getValues().itemsFields.map((field, indexOfField) =>
            <ItemFormField key={field.id}
                           field={field}
                           indexOfItem={props.index}
                           indexOfField={indexOfField}/>,
          )}
        </Grid>

      </Grid>
    </Grid>

    <ImagePreview width={650}
                  itemIndex={props.index}/>
  </div>;
}
