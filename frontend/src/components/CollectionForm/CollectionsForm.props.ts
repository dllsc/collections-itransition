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
  readonly name: string;
  readonly type: EItemFieldType;
  readonly values: any[];
}

export interface CollectionForm {
  name: string,
  description: string,
  theme: string,
  items: IAddItemFormModel[];
  itemsFields: IItemField[];
}

export interface CollectionFormProps {
  mode: 'add' | 'edit';
}
