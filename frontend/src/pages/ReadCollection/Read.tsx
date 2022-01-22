import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

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

var cardStyle = {
  display: 'block',
  width: '100vh',
  transitionDuration: '0.3s',
  height: '100vh',
};

var arrStyle = {
  background: 'red',
  display: 'block',
  width: 'auto',
};


var items = [
  {
    name: 'Item #1',
    image: 'Probably the most random thing you have ever seen!',
  },
  {
    name: 'Item #2',
    image: 'https://icdn.lenta.ru/images/2021/04/27/16/20210427163138131/square_320_c09ebae17387b7d6eeb9fa0d42afe5ee.jpg',
  },
];

interface IItem {
  readonly name: string;
  readonly image: string;
}

interface IItemProps {
  item: IItem;
}

function Item(props: IItemProps) {
  return (
    <Card>
      <Grid container>
        <Grid item
              xs={1}>
        </Grid>
        <Grid item
              xs={6}>
          <div>
            <CardContent>
              <Typography variant="h5"
                          component="div">
                Name Item {props.item.name}
              </Typography>
              <p>Тут филды</p>
            </CardContent>
          </div>
        </Grid>

        <Grid item
              xs={4}>
          <CardMedia component="img"
                     image={props.item.image}/>
        </Grid>
        <Grid item
              xs={1}/>
      </Grid>
    </Card>
  );
}

function CardCollection() {
  return <Card variant="outlined">
    <CardContent>
      <Typography variant="h3"
                  component="div">
        Name collection
      </Typography>
      <CardActions>
        <Button>
          <Typography sx={{ mb: 1.5 }}
                      color="text.secondary">
            Author
          </Typography>
        </Button>
        <Button>
          <Typography sx={{ mb: 1.5 }}
                      color="text.secondary">
            Theme
          </Typography>
        </Button>
      </CardActions>

      <Typography variant="body1">
        Description.........
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Open</Button>
    </CardActions>
  </Card>;
}

function CardItem() {
  return <Carousel navButtonsAlwaysVisible={true}
                   indicators={false}>
    {
      items.map((item, i) => <Item key={i}
                                   item={item}/>)
    }
  </Carousel>;
}


export function Read() {
  const params = useParams<{ id: string }>();

  params.id;

  return <>
    <Grid container>
      <Grid item
            xs={2}/>
      <Grid item
            xs={8}>


        <div>
          <Grid container>

            <Grid item
                  xs={6}>
              <CardCollection/>
            </Grid>

            <Grid item
                  xs={6}>
              <CardItem/>
            </Grid>

          </Grid>
        </div>


      </Grid>


    </Grid>


  </>;
}
