import { EItemFieldType } from './create-collection.dto';

export interface IFieldDto {
  readonly name: string;
  readonly values: string[];
  readonly type: EItemFieldType;
  readonly collectionId: number;
}

export interface IFieldJsonDto extends IFieldDto {
  readonly id: number;
}
