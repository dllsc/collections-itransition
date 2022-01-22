import { ICreateItemDto, IItemJsonDto } from './create-item.dto';

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

export interface IItemFormDto {
  readonly name: string;
}

export interface ICollectionForm {
  name: string;
  description: string;
  theme: string;
  items: IItemFormDto[];
  itemsFields: IItemField[];
}

export interface ICollectionFormDto {
  name: string;
  description: string;
  theme: string;
  items: ICreateItemDto[];
  itemsFields: IItemField[];
}

export interface ICollectionFormDataJsonDto {
  readonly collection: string;
}

export interface ICollectionDto {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
  readonly userId: number;
}

export interface IItemFieldJsonDto {
}

export interface ICollectionJsonDto {
  name: string;
  description: string;
  theme: string;
  items: IItemJsonDto[];
  itemsFields: IItemFieldJsonDto[];
}
