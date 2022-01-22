export interface ICreateItemDto {
  readonly name: string;
}

export interface IItemDto extends ICreateItemDto {
  readonly image: string;
  readonly collectionID: number;
}

export interface IItemJsonDto extends IItemDto {
}
