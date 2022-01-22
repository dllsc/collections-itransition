import CollectionsEntity from '../../db/collections.entity';
import { IItemDto } from '../dto/create-item.dto';
import ItemsEntity from '../../db/items.entity';

export class ItemService {

  async insert(itemDetails: IItemDto): Promise<ItemsEntity> {
    const { name, image, collectionID } = itemDetails;
    const item = new ItemsEntity();
    item.name = name;
    item.collection = await CollectionsEntity.findOne(collectionID);
    item.image = image;
    await item.save();
    return item;
  }

  async getAllItems(collectionID): Promise<ItemsEntity[]> {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    console.log(collectionID);
    const items = ItemsEntity.find({where: {collection: collectionID}});
    return items;
  }
}
