import { EItemFieldType } from './collection.dto';

export interface IItemFieldFormDto {
  readonly id: string;
  readonly name: string;
  readonly type: EItemFieldType;
  readonly values: any[];
}

export interface IFieldEntityDto {
  readonly name: string;
  readonly values: string[];
  readonly type: EItemFieldType;
  readonly collectionId: number;
}

export interface IItemFieldDto extends IItemFieldFormDto {
}
