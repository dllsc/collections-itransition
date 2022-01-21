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

// 1, 2, 3,1, 1
// asdqwe, 1qdasdaf, fwwegwe
// 01/01/2020 , 01/01/2020, 01/01/2020

export interface ICollectionForm {
  name: string,
  description: string,
  theme: string,
  items: IAddItemFormModel[];
  itemsFields: IItemField[];
}

export interface CollectionFormProps {
  mode: 'add' | 'edit';
}
