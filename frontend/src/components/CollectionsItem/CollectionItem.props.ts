import { ReactNode } from 'react';

export interface IItem {
  readonly id: number;
  readonly image: File;
  readonly name: string;
  readonly collectionId: number;
  child?: ReactNode
}
