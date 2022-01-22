export interface IAddItemFormModel {
  readonly name: string;
  readonly image: FileList;
}

export enum EItemFieldType {
  DATE = 'date',
  NUMBER = 'number',
  STRING = 'string',
}

export interface IItemField {
  readonly id: string;
  readonly name: string;
  readonly type: EItemFieldType;
  readonly values: any[];
}

export interface ICollectionForm {
  name: string,
  description: string,
  theme: string,
  items: IAddItemFormModel[];
  itemsFields: IItemField[];
}

export interface IItemFormDto {
  readonly name: string;
}

export interface ICollectionFormDto {
  name: string;
  description: string;
  theme: string;
  items: IItemFormDto[];
  itemsFields: IItemField[];
}

export interface CollectionFormProps {
  mode: 'add' | 'edit';
}
