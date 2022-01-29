import { EItemFieldType } from '../../components/CollectionForm/EItemFieldType';

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
