import { IItemFormDto, IItemEntityDto} from './item.dto';
import { IFieldDto, IItemFieldFormDto } from './field.dto';

export enum EItemFieldType {
  DATE = 'date',
  NUMBER = 'number',
  STRING = 'string',
}

export interface ICollectionFormDataJsonDto {
  readonly collection: string;
}


export interface ICollectionFormDto {
  id?: number;
  name: string;
  description: string;
  theme: string;
  items: IItemFormDto[];
  itemsFields: IItemFieldFormDto[];
  editCollection?: ICollectionDto;
}

export interface ICollectionEntityDto {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
  readonly userId: number;
}

export interface ICollectionDto extends ICollectionEntityDto {
  items: IItemEntityDto[];
  itemsFields: IFieldDto[];
}
