export interface CreateItemDto {
  readonly name: string;
  readonly collectionID: string;
}

export interface ItemDto extends CreateItemDto {
  readonly image: string;
}
