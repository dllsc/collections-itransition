import { IItemFormDto, IItemEntityDto} from './item.dto';
import { IItemFieldFormDto } from './field.dto';

export enum EItemFieldType {
  DATE = 'date',
  NUMBER = 'number',
  STRING = 'string',
}

export interface ICollectionFormDataJsonDto {
  readonly collection: string;
}


export interface ICollectionFormDto {
  name: string;
  description: string;
  theme: string;
  items: IItemFormDto[];
  itemsFields: IItemFieldFormDto[];
}

export interface ICollectionEntityDto {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
  readonly userId: number;
}

export interface ICollectionDto {
  name: string;
  description: string;
  theme: string;
  items: IItemEntityDto[];
  itemsFields: IItemFieldFormDto[];
}
