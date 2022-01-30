import {
  Badge,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton, Paper,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';
import { HTMLProps, useEffect, useState } from 'react';
import { get } from '../../axios-instance';
import { Field, ICollection, Item } from './models';
import ReactMarkdown from 'react-markdown';
// import * as imager from '../../../../backend/dist/images'
import './Read-collection.styles.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton/IconButton';
import Carousel from 'react-material-ui-carousel';
import { ImportContacts } from '@mui/icons-material';


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

interface ExpandProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandProps & IconButtonProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CollectionInfo(props: IInfoCollectionProps) {
  return <div className="collection-info"
              style={{ textAlign: 'center' }}>
    <div style={{ borderBottom: '2px solid white', textAlign: 'center', paddingBottom: '20px' }}>
      <Typography display={'inline'}
                  variant="h3"
                  color={'white'}
                  style={{ textShadow: '2px 2px 4px black' }}>
        {props.name}
      </Typography>
    </div>
    <Typography variant="body1"
                color={'white'}
                style={{ textShadow: '2px 2px 4px black', paddingTop: '20px' }}>
      {props.description}
    </Typography>
    <Typography color={'white'}
                style={{ textShadow: '2px 2px 4px black', paddingTop: '20px' }}>
      Theme: {props.theme}
    </Typography>
    {/*<ReactMarkdown>*/}
    {/*  # Hello, *world**/}
    {/*</ReactMarkdown>*/}
  </div>;
}

function FieldItemCard(props: FieldItemCardProps) {
  return <div>
    <p>{props.name}: {props.values.split(',')[props.valuesId]}</p>
  </div>;
}

// ${props.image}
function ItemCard(props: ItemCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return <Paper style={{ backgroundImage: 'url(https://w-dog.ru/wallpapers/2/12/437209449449415.jpg)' }}>
    <div style={{ height: '33.3vh', textAlign: 'center' }}>
      <div style={{ borderBottom: '2px solid white', textAlign: 'center', paddingTop: '20px' }}>
        <Typography display={'inline'}
                    variant="h3"
                    color={'white'}
                    style={{ textShadow: '3px 3px 7px black', paddingTop: '10vw' }}>
          {props.name}
        </Typography>
      </div>

      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon style={{ color: 'white' }}/>
      </ExpandMore>


      <div style={{ position: 'relative' }}>

      </div>
      <Collapse in={expanded}
                timeout="auto"
                style={{

                  position: 'absolute',
                  background: 'rgb(255,255,255,0.4)',
                  width: '49vw',
                  border: '1px solid lightgray',
                  borderRadius: '23px',
                  marginLeft: '15px',
                }}
      >

        <Carousel indicators={false}>
          {props.fields.map(f => <FieldItemCard
            key={f.id}
            id={f.id}
            name={f.name}
            values={f.values}
            type={f.type}
            valuesId={props.index}/>)}
        </Carousel>
        {/*{props.fields.map(f => <FieldItemCard id={f.id}*/}
        {/*                                      name={f.name}*/}
        {/*                                      values={f.values}*/}
        {/*                                      type={f.type}*/}
        {/*                                      valuesId={props.index}/>)}*/}

      </Collapse>

    </div>


    {/*<ReactMarkdown>*/}
    {/*  # Hello, *world**/}
    {/*</ReactMarkdown>*/}
  </Paper>;
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

  return <Paper style={{ backgroundImage: 'url(https://w-dog.ru/wallpapers/2/12/437209449449415.jpg)' }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ height: '100vh', width: '50vw', position: 'relative' }}>
        {collection &&
          <div style={{ position: 'absolute', top: '50%', marginTop: '-100px', left: '50%', marginLeft: '-290px' }}>
            <CollectionInfo
              name={collection.name}
              theme={collection.theme}
              description={collection.description}/>
          </div>
        }
      </div>


      {collection && <div className="oneCollection">

        {collection.items.map((i, index) => <ItemCard
          key={i.id}
          name={i.name}
          image={i.image}
          fields={collection.fields}
          index={index}/>,
        )}
      </div>
      }
    </div>
  </Paper>;
}

