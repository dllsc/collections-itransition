export interface IItemFormDto {
  readonly name: string;
}

export interface IItemEntityDto extends IItemFormDto {
  readonly image: string;
  readonly collectionId: number;
}

export interface IItemDto extends IItemEntityDto {
}

