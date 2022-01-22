import React from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { MatButton, MatInput } from '../imports-material';
import { ErrorMessage } from '@hookform/error-message';
import { FormControlLabel, IconButton, Radio, RadioGroup, TextareaAutosize, TextField } from '@mui/material';
import { REQUIRE_MESSAGE } from '../../constants/constants';
import {
  EItemFieldType,
  IAddItemFormModel,
  ICollectionForm, ICollectionFormDto,
  IItemField,
} from '../../components/CollectionForm/CollectionsForm.props';
import { Delete } from '@mui/icons-material';
import { randomString } from '../../components/CollectionItemForm/RandomString';
import { post } from '../../axios-instance';

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


  return <div>
    <h1>New Item</h1>

    <div>
      <MatInput {...register(`items.${props.index}.name`, required)} label="name item"/>
      <ErrorMessage errors={errors}
                    name={`items.${props.index}.name`}
                    as="p"/>
    </div>

    <div>
      <MatInput type="file" {...register(`items.${props.index}.image`, required)}/>
      <ErrorMessage errors={errors}
                    name={`items.${props.index}.image`}
                    as="p"/>
    </div>

    <div>
      {getValues().itemsFields.map((field, indexOfField) =>
        <div key={field.id}>
          {field.name}
          <TextField type={getInputTypeByFieldType(field.type)}
                     {...register(`itemsFields.${indexOfField}.values.${props.index}`, { onChange: () => trigger() })}/>
        </div>,
      )}
    </div>

    <IconButton onClick={props.remove}
                disabled={props.single}>
      <Delete/>
    </IconButton>
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

  return <>
    {itemForms.map((item, index) => <ItemForm key={item.id}
                                              index={index}
                                              remove={() => removeItem(index)}
                                              single={itemForms.length === 1}/>)}
    <MatButton onClick={addInput}> ADD ITEM </MatButton>
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
    {getValues().itemsFields[props.index].name}

    <MatInput type="text"
              {...register(`itemsFields.${props.index}.name`, { onBlur: updateValue })} />

    <RadioGroup style={{ flexDirection: 'row' }}>
      <FormControlLabel control={createRadioWithType(EItemFieldType.STRING)}
                        label="String"/>
      <FormControlLabel control={createRadioWithType(EItemFieldType.DATE)}
                        label="Date"/>
      <FormControlLabel control={createRadioWithType(EItemFieldType.NUMBER)}
                        label="Number"/>
    </RadioGroup>

    <Delete onClick={props.remove}/>
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
      <h1>Collections</h1>

      <pre>
        {JSON.stringify(getValues(), null, 2)}
      </pre>

      <MatInput {...register('name', required)}
                label="name collection"/>
      <ErrorMessage errors={errors}
                    name="name"
                    as="p"/>

      <TextareaAutosize {...register('description', required)}/>
      <MatInput {...register('theme', required)}
                label="theme"/>

      <FieldFormList/>

      <ItemFormsList/>

      {isValid}

      <MatButton type="submit">
        Add Collection
      </MatButton>
    </form>
  </FormProvider>;
}
