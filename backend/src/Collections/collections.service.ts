import UserEntity from '../../db/user.entity';
import CollectionsEntity from '../../db/collections.entity';


export class CollectionsService {

  async insert(collectionDetails: any): Promise<CollectionsEntity> {
    const { name, description, theme, userID } = collectionDetails;
    const collection = new CollectionsEntity();
    collection.name = name;
    collection.user = await UserEntity.findOne(userID);
    collection.theme = theme;
    collection.description = description;
    await collection.save();
    return collection;
  }

  async getAllCollection(userID): Promise<CollectionsEntity[]> {
    const collections = CollectionsEntity.find({where: {user: userID}})
    return collections;
  }

  async getCollection(collectionID): Promise<CollectionsEntity> {
    const collections = CollectionsEntity.findOne({where: {id: collectionID}})
    return collections;
  }

}
