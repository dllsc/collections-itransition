import { IField } from './Field.props';


export function ItemField(field: IField) {
  return <div>
    {field.string && <p>{field.string}</p>}
    {field.data && <p>{field.data}</p>}
    {field.number && <p>{field.number}</p>}
  </div>;

}
