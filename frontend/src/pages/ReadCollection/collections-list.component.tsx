import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { get } from '../../axios-instance';
import {
  Badge,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Grid,
  IconButton, InputLabel, Link, MenuItem,
  Select, SelectChangeEvent,
  Typography,
} from '@mui/material';
import { appHistory } from '../../utils/history.utils';
import { ICollection } from './models';
import { imageToBackground } from '../../utils/styles.utils';
import Button from '@mui/material/Button';
import {
  ArrowBackIos,
  ArrowForwardIos, CreateNewFolder, CreateSharp, DeleteForeverOutlined,
  Edit,
  FavoriteBorder, ReadMore,
} from '@mui/icons-material';
import { getUserId, isLoggedIn } from '../../utils/login.utils';
import * as events from 'events';


interface ICardCollection {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
  readonly id: number;
}

interface ToolsProps {
  readonly id: number;
}

function ToolsRead(props: ToolsProps) {
  const href = `/collection/read/${props.id}`;

  const goToCollection = () => appHistory.push(href);

  return <div>
    <Button
      onClick={goToCollection}
      variant="outlined"
      size="large"
      color="primary"
      style={{ width: 90, marginBottom: 10 }}>
      <ReadMore/>
      Read
    </Button>
    <Button
      style={{ width: 90 }}
      variant="outlined"
      size="large"
      color="error">
      <FavoriteBorder/> Like
    </Button>
  </div>;
}

function ToolsAuth(props: ToolsProps) {

  return <div>
    <Button variant="outlined"
            size="large"
            color="error"
            style={{ width: 90, marginBottom: 10 }}>
      <DeleteForeverOutlined/> Delete
    </Button>
    <Button variant="outlined"
            size="large"
            color="primary"
            style={{ width: 90 }}
            onClick={() => appHistory.push(`/collection/edit/${props.id}`)}>
      <Edit/> Edit
    </Button>
  </div>;
}

function CollectionCard(props: ICardCollection) {

  return (

    <div style={{
      textAlign: 'center',
      background: 'url(https://wallpaperaccess.com/full/4356359.jpg)',
      paddingTop: 15,
      marginBottom: 15,
      paddingBottom: 15,
      marginLeft: 15,
      border: '1px solid gray',
    }}>

      <Grid container>
        <Grid item
              xs={2}>
          <ToolsAuth id={props.id}/>
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
          <ToolsRead id={props.id}/>
        </Grid>
      </Grid>

    </div>);

}

export function CollectionsListComponent() {
  const params = useParams<{ page: string, limit: string }>();
  const [isLoading, setLoading] = useState(true);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [limit, setLimit] = useState(params.limit);


  const goNext = () => {

    if (!(collections.length < parseInt(params.limit))) {
      const href = `/collection/all/${parseInt(params.page) + 1}/${params.limit}`;

      get<ICollection[]>(`collection/page/${parseInt(params.page) + 1}/${params.limit}`).then(data => {
        if (data.length) {
          appHistory.push(href);
          setLoading(true);
          setCollections(data);
          setLoading(false);
        }

      });
    }
  };

  const goBack = () => {
    if (parseInt(params.page) > 0) {
      setLoading(true);
      const href = `/collection/all/${parseInt(params.page) - 1}/${params.limit}`;
      appHistory.push(href);
      get<ICollection[]>(`collection/page/${parseInt(params.page) - 1}/${params.limit}`).then(data => {
        setCollections(data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    get<ICollection[]>(`collection/page/${params.page}/${params.limit}`).then(data => {
      setCollections(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const handleChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value);
    const href = `/collection/all/${parseInt(params.page)}/${event.target.value}`;
    appHistory.push(href);
    get<ICollection[]>(`collection/page/${parseInt(params.page) - 1}/${event.target.value}`).then(data => {
      setCollections(data);
      setLoading(false);
    });
  };

  return <>
    <Grid container
          alignItems="center">
      <Grid item
            xs={1}
            style={{ textAlign: 'center' }}>
        <IconButton size={'large'}
                    onClick={goBack}>
          <ArrowBackIos/>
        </IconButton>
      </Grid>
      <Grid item
            xs={10}
            style={{ height: '100vh', overflowY: 'auto' }}>
        <div style={{ textAlign: 'right', paddingBottom: 15, paddingTop: 25 }}>
          <FormControl style={{ width: 100, marginRight: 20 }}>
            <InputLabel id="select-label">Show</InputLabel>
            <Select
              labelId="select-label"
              value={limit}
              label="Show"
              onChange={handleChange}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>


  <Link>
    <Button onClick={() => appHistory.push('/registration')}>
      Registration
    </Button>
  </Link>

  <Link>
    <Button onClick={() => appHistory.push('/login')}>
      Login
    </Button>
  </Link>



          <IconButton color={'default'}
                      onClick={() => {
                        getUserId();
                        appHistory.push(`/collection/create`);
                      }}>
            <CreateSharp/> Create New
          </IconButton>
        </div>
        <Grid container>
          {collections.map(c => <Grid item
                                      xs={6}>
              <CollectionCard name={c.name}
                              description={c.description}
                              theme={c.theme}
                              id={c.id}/>
            </Grid>,
          )}
        </Grid>

      </Grid>
      <Grid item
            xs={1}
            style={{ textAlign: 'center' }}>
        <IconButton size={'large'}
                    onClick={goNext}>
          <ArrowForwardIos/>
        </IconButton>
      </Grid>
    </Grid>


  </>;

}
