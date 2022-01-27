import { Badge, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { get } from '../../axios-instance';
// import * as imager from '../../../../backend/dist/images'
export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 100,
    margin: '3rem',

  },
  media: {
    height: 140,
  },
}));


export interface Item {
  id: number;
  name: string;
  image: string;
}

export interface Field {
  id: number;
  name: string;
  values: string;
  type: string;
}

export interface ICollection {
  id: number;
  name: string;
  description: string;
  theme: string;
  items: Item[];
  fields: Field[];
}

interface ItemCardProps {
  name: string;
  image: string;
  fields: Field[];
  index: number;
}

interface FieldItemCardProps {
  id: number;
  name: string;
  values: string;
  type: string;
  valuesId: number;
}

interface IInfoCollectionProps {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
}

export interface ICardItemProps {
  readonly items: Item[];
  readonly fields: Field[];
}

// function CardItem(props: IInfoCollectionProps) {
//   return <Carousel navButtonsAlwaysVisible={true}
//                    indicators={false}>
//     {
//       props.items.map((item, i) => <Item key={i}
//                                          fields={props.fields}
//                                          item={item}/>)
//     }
//   </Carousel>;
// }

function CollectionInfo(props: IInfoCollectionProps) {
  return <div className="collectionInfo">
    <Badge badgeContent={props.theme}
           color="secondary"
           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <h1>Collection: {props.name}</h1>
    </Badge>
    <p>{props.description}</p>
  </div>;
}

function FieldItemCard(props: FieldItemCardProps) {
  return <div>
    <p>{props.name}: {props.values.split(',')[props.valuesId]}</p>
  </div>;
}
// ${props.image}
function ItemCard(props: ItemCardProps) {
  const image = `../../../../backend/dist/images/4d82df.3.png`
  return <Card variant="outlined">
    <Grid container>
      <Grid item
            xs={4}>
        <h3>{props.name}</h3>
      </Grid>
      <Grid item
            xs={4}>
        {props.fields.map(f => <FieldItemCard id={f.id}
                                              name={f.name}
                                              values={f.values}
                                              type={f.type}
                                              valuesId={props.index}/>)}
      </Grid>
      <Grid item
            xs={4}>
        <CardMedia component="img" height="140" image='/backend/dist/images/4d82df.3.png'/>
      </Grid>
    </Grid>
  </Card>;
}

export function CollectionView() {
  const params = useParams<{ id: string }>();

  const [isLoading, setLoading] = useState(true);
  const [collection, setCollection] = useState<ICollection>();

  useEffect(() => {
    get<ICollection>(`collection/one/${params.id}`).then(data => {
      setCollection(data);
      setLoading(false);
    });
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>
    <Grid container>
      <Grid item
            xs={3}/>
      <Grid item
            xs={6}>
        {collection && <div className="oneCollection">
          <CollectionInfo name={collection.name}
                          theme={collection.theme}
                          description={collection.description}/>
          {collection.items.map((i, index) => <ItemCard name={i.name}
                                                        image={i.image}
                                                        fields={collection.fields}
                                                        index={index}/>)}
        </div>
        }

      </Grid>

    </Grid>
  </>;

}

