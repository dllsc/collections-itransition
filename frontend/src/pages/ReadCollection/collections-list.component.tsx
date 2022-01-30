import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { get } from '../../axios-instance';
import { Badge, Card, CardActionArea, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { appHistory } from '../../utils/history.utils';
import { ICollection } from './models';
import { imageToBackground } from '../../utils/styles.utils';
import Button from '@mui/material/Button';
import {
  ArrowBackIos,
  ArrowForwardIos, CreateNewFolder, CreateSharp,
  Edit,
  FavoriteBorder,
} from '@mui/icons-material';


interface ICardCollection {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
  readonly id: number;
}


function CollectionCard(props: ICardCollection) {
  const href = `/collection/read/${props.id}`;

  const goToCollection = () => appHistory.push(href);

  return (

    <div style={{
      textAlign: 'center',
      background: 'url(https://wallpaperaccess.com/full/4356359.jpg)',
      paddingTop: 15,
      marginBottom: 15,
      paddingBottom: 15,
      border: '1px solid gray',
    }}>

      <Grid container>
        <Grid item
              xs={2}>
          <Button variant="outlined"
                  size="large"
                  color="primary"
                  onClick={() => appHistory.push(`/collection/edit/${props.id}`)}>
            <Edit/> Edit
          </Button>
        </Grid>
        <Grid item
              xs={8}>
          <Typography display={'inline'}
                      variant="h3"
                      color={'white'}
                      style={{ textShadow: '2px 2px 4px black', textDecoration: '3px underline' }}>
            {props.name}
          </Typography>
          <Typography color={'white'}
                      variant="h5"
                      style={{ textShadow: '2px 2px 4px black', paddingTop: '20px' }}>
            {props.theme}
          </Typography>
        </Grid>
        <Grid item
              xs={2}>
          <Button
            style={{ marginRight: 5 }}
            onClick={goToCollection}
            variant="outlined"
            size="large"
            color="primary">
            Read
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="error">
            <FavoriteBorder/> Like
          </Button>
        </Grid>
      </Grid>

    </div>);

}

export function CollectionsListComponent() {
  const params = useParams<{ page: string, limit: string }>();
  const [isLoading, setLoading] = useState(true);
  const [collections, setCollections] = useState<ICollection[]>([]);

  useEffect(() => {
    get<ICollection[]>(`collection/page/${params.page}/${params.limit}`).then(data => {
      setCollections(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>


    <Grid container
          spacing={0}
          alignItems="center"
          style={{

          }}>
      <Grid item
            xs={1}
            style={{ textAlign: 'center' }}>
        <IconButton size={'large'}><ArrowBackIos/></IconButton>
      </Grid>
      <Grid item
            xs={10}
      style={{height: '100vh', overflowY: 'auto'}}>
        <div style={{ textAlign: 'right', paddingBottom: 15, paddingTop: 25 }}>
          <IconButton color={'default'}
                      onClick={() => appHistory.push(`/collection/add`)}>
            <CreateSharp/> Create New
          </IconButton>
        </div>
        {collections.map(c => <CollectionCard name={c.name}
                                              description={c.description}
                                              theme={c.theme}
                                              id={c.id}/>)}
      </Grid>
      <Grid item
            xs={1}
            style={{ textAlign: 'center' }}>
        <IconButton size={'large'}
                    onClick={() => console.log('hahaha')}>
          <ArrowForwardIos/>
        </IconButton>
      </Grid>
    </Grid>


  </>;

}
