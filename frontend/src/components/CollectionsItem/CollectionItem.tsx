import { IItem } from './CollectionItem.props';


export function CollectionItem(item: IItem) {
  return <div>
    <h1>Item name: {item.name}</h1>
    {item.child}
    <p>img: {item.image} pages</p>
  </div>;
}
