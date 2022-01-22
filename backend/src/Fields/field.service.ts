import CollectionsEntity from '../../db/collections.entity';

export class FieldService {

  // async insert(fieldDetails: CreateFieldsDto): Promise<CollectionsEntity> {
  //   const { number, string, date, collectionID } = fieldDetails;
  //   const field = new FieldsEntity();
  //   field.numberValue = number;
  //   field.item = await UserEntity.findOne(userID);
  //   field.theme = theme;
  //   field.description = description;
  //   await field.save();
  //   return field;
  // }

  async getAllCollection(userID): Promise<CollectionsEntity[]> {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    const collections = CollectionsEntity.find({where: {user: userID}})
    return collections;
  }

}
