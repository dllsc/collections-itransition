import React from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { MatButton } from '../imports-material';
import { ErrorMessage } from '@hookform/error-message';
import {
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Select,
  MenuItem, InputLabel, NativeSelect, Fab, FormControl,
} from '@mui/material';
import { REQUIRE_MESSAGE } from '../../constants/constants';
import {
  EItemFieldType,
  IAddItemFormModel,
  ICollectionForm, ICollectionFormDto,
  IItemField,
} from '../../components/CollectionForm/CollectionsForm.props';
import { Delete, ImportContacts } from '@mui/icons-material';
import { randomString } from '../../components/CollectionItemForm/RandomString';
import { post } from '../../axios-instance';
import './collectionForm.styles.css';
import AddIcon from '@mui/icons-material/Add';

type WithId<TInitial> = TInitial & { id: string };

interface IAddItemFormProps {
  readonly index: number;
  readonly remove: () => void;
  readonly single: boolean;
}

interface IItemFieldProps {
  readonly field: IItemField;
  readonly index: number;
  readonly remove: () => void;
}

const required = { required: REQUIRE_MESSAGE };

function keyOf<T>(key: keyof T): string {
  return key as any as string;
}

function createDefaultItemForm(): IAddItemFormModel {
  return {
    name: 'Initial name',
    image: new DataTransfer().files,
  };
}

function createDefaultFieldForm(itemsCount: number, type: EItemFieldType): IItemField {
  return {
    id: randomString(),
    name: 'test field',
    type,
    values: createDefaultFieldFormValues(itemsCount, type),
  };
}

function createDefaultCollectionForm(): ICollectionForm {
  return {
    name: 'My new collection',
    description: 'This is collection of ...',
    theme: 'Alcohol',
    items: [createDefaultItemForm()],
    itemsFields: [createDefaultFieldForm(1, EItemFieldType.STRING)],
  };
}

function createDefaultFieldFormValues(itemsCount: number, type: EItemFieldType): any[] {
  return Array(itemsCount).fill(createDefaultValueForType(type));
}

function createDefaultValueForType(type: EItemFieldType): any {
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

function ItemForm(props: IAddItemFormProps) {
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

function ItemFormsList() {
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

function FieldForm(props: IItemFieldProps) {
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

  return <div style={{ display: 'flex' }}>
    {/*{getValues().itemsFields[props.index].name}*/}

    <Grid container>
      <Grid item
            xs={3}>
        <TextField type="text"
                   {...register(`itemsFields.${props.index}.name`, { onBlur: updateValue })} />
      </Grid>

      <Grid item>
        <RadioGroup style={{ flexDirection: 'row' }}>
          <FormControlLabel control={createRadioWithType(EItemFieldType.STRING)}
                            label="String"/>
          <FormControlLabel control={createRadioWithType(EItemFieldType.DATE)}
                            label="Date"/>
          <FormControlLabel control={createRadioWithType(EItemFieldType.NUMBER)}
                            label="Number"/>
        </RadioGroup>
      </Grid>

      <Grid item
            xs={1}>
        <Delete onClick={props.remove}/>
      </Grid>
    </Grid>


  </div>;
}

function FieldFormList() {
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

    <MatButton onClick={appendNewField}> ADD FIELD </MatButton>
  </>;
}

export function CollectionForm() {
  const formControl = useForm<ICollectionForm>({
    defaultValues: createDefaultCollectionForm(),
  });
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = formControl;

  const onSubmit: SubmitHandler<ICollectionForm> = (collectionForm: ICollectionForm) => {
    console.log('submit');

    console.log(collectionForm);

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

      <pre>
        {JSON.stringify(getValues(), null, 2)}
      </pre>


      <div className="collectionDescription">

            <Grid container>
              <Grid item
                    xs={6}> <TextField {...register('name', required)}
                                       label="name collection"/>
                <ErrorMessage errors={errors}
                              name="name"
                              as="p"/></Grid>
              <Grid item
                    xs={1}/>
              <Grid item
                    xs={4}>

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
              <Grid item
                    xs={11}>
                <TextareaAutosize {...register('description', required)} minRows={8}
                                  style={{ width: '100%', marginTop: 25, marginBottom:10}}/>
              </Grid>
              <MatButton type="submit">
                Save Collection
              </MatButton>
            </Grid>

            <FieldFormList/>

      </div>
      <ItemFormsList/>
    </form>
  </FormProvider>;
}
