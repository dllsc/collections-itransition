import React from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { MatButton, MatInput } from '../imports-material';
import { ErrorMessage } from '@hookform/error-message';
import { IconButton, TextareaAutosize } from '@mui/material';
import { REQUIRE_MESSAGE } from '../../constants/constants';
import {
  CollectionForm,
  EItemFieldType,
  IAddItemFormModel,
  IFieldValue,
  IItemField,
} from '../../components/CollectionForm/CollectionsForm.props';
import { Delete } from '@mui/icons-material';

const required = { required: REQUIRE_MESSAGE };

interface IAddItemFormProps {
  readonly index: number;
  readonly remove: () => void;
  readonly single: boolean;
}

function createDefaultFieldValue(field: IItemField): IFieldValue {
  return {
    name: field.name,
    date: matchOrNull(field.type === EItemFieldType.DATE, new Date()),
    str: matchOrNull(field.type === EItemFieldType.STRING, field.name),
    number: matchOrNull(field.type === EItemFieldType.NUMBER, 0),
  };
}

function matchOrNull<TValue>(isMatch: boolean, value: TValue): TValue | null {
  return isMatch ? value : null;
}

function createDefaultItemForm(): IAddItemFormModel {
  return {
    name: 'Initial name',
    image: new DataTransfer().files,
  };
}

function AddItemForm(props: IAddItemFormProps) {
  const { register, formState: { errors } } = useFormContext<CollectionForm>();

  return <div>
    <h1>New Item</h1>
    <MatInput {...register(`items.${props.index}.name`, required)} label="name item"/>
    <ErrorMessage errors={errors}
                  name={`items.${props.index}.name`}
                  as="p"/>
    <MatInput type="file" {...register(`items.${props.index}.image`, required)}/>
    <ErrorMessage errors={errors}
                  name={`items.${props.index}.image`}
                  as="p"/>
    <IconButton onClick={props.remove}
                disabled={props.single}>
      <Delete/>
    </IconButton>
  </div>;
}

function ItemFormList() {
  const { append, fields: itemForms, remove } = useFieldArray<CollectionForm>({ name: 'items' });
  const itemsFieldsFormArray = useFieldArray<CollectionForm>({ name: 'itemsFields' });
  // const itemsFieldsWithType = itemsFieldsFormArray.fields as IItemField[];

  // console.log(itemsFieldsWithType);

  const addInput = () => append(createDefaultItemForm());

  return <>
    {itemForms.map((item, index) => <AddItemForm key={item.id}
                                              index={index}
                                              remove={() => remove(index)}
                                              single={itemForms.length === 1}/>)}
    <MatButton onClick={addInput}> ADD ITEM </MatButton>
  </>;
}

interface IItemFieldProps {
  readonly field: IItemField;
  readonly index: number;
}

function ItemField(props: IItemFieldProps) {
  return <div>
    {props.field.name}
  </div>
}

type WithId<TInitial> = TInitial & { id :string };

function FieldsList() {
  const itemsFieldsFormArray = useFieldArray<CollectionForm>({ name: 'itemsFields' });
  const itemsFieldsWithType = itemsFieldsFormArray.fields as WithId<IItemField>[];

  return <>
    {itemsFieldsWithType.map((field, index) =>
      <ItemField field={field} index={index} key={field.id} />
    )}

    {/*<MatButton onClick={() => itemsFieldsFormArray.append()}> ADD FIELD </MatButton>*/}
  </>
}

export function AddCollection() {
  const collectionFields: IItemField[] =  [{ name: 'test field', type: EItemFieldType.STRING, values: ['test value'] }];
  const defaultCollection: CollectionForm = {
    name: 'My new collection',
    description: 'This is collection of ...',
    theme: 'Alcohol',
    items: [createDefaultItemForm()],
    itemsFields: collectionFields,
  };
  const formControl = useForm<CollectionForm>({
    defaultValues: defaultCollection,
  });
  const { register, handleSubmit, formState: { errors, isValid }, getValues } = formControl;

  const onSubmit: SubmitHandler<CollectionForm> = data => {
    console.log('submit');

    // const images = getValues().items.map(item => item.image[0]);
  };

  return <FormProvider {...formControl}>
    <form onSubmit={handleSubmit(onSubmit)}
          className="form">
      <h1>Collections</h1>

      <MatInput {...register('name', required)}
                label="name collection"/>
      <ErrorMessage errors={errors}
                    name="name"
                    as="p"/>

      <TextareaAutosize {...register('description', required)}/>
      <MatInput {...register('theme', required)}
                label="theme"/>

      <FieldsList />

      <ItemFormList/>

      {isValid}

      <MatButton type="submit">
        Add Collection
      </MatButton>
    </form>
  </FormProvider>;
}
