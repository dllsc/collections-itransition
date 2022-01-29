import { EItemFieldType } from '../../enums/item-field.enum';

export interface Item {
  id: number;
  name: string;
  image: string;
}

export interface Field {
  id: number;
  name: string;
  values: string;
  type: EItemFieldType;
}

export interface ICollection {
  id: number;
  name: string;
  description: string;
  theme: string;
  items: Item[];
  fields: Field[];
}

export interface IAddItemFormModel {
  readonly name: string;
  readonly image: FileList;
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
  editCollection?: ICollection;
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
