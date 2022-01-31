import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { appHistory } from '../../utils/history.utils';
import Button from '@mui/material/Button';
import { DeleteForeverOutlined, Edit, Favorite, FavoriteBorder, ReadMore } from '@mui/icons-material';
import { get, post } from '../../axios-instance';
import { isCurrentUser, isLoggedIn } from '../../utils/login.utils';

interface ToolsProps {
  readonly id: number;
}

interface ICardCollection {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
  readonly id: number;
  readonly userId: number;
}

function ToolsRead(props: ToolsProps) {
  const href = `/collection/read/${props.id}`;

  const goToCollection = () => appHistory.push(href);

  const [liked, setLiked] = useState(false);
  const [likesTotal, setLikesTotal] = useState(0);

  const toggleLike = () => post<object, boolean>(`like/${props.id}`, {}).then(setLiked);

  useEffect(() => {
    if (isLoggedIn()) {
      console.log('12312312312')
      get<boolean>(`like/${props.id}`).then(setLiked);
    }
  }, []);

  useEffect(() => {
    get<number>(`like/total/${props.id}`).then(setLikesTotal);
  }, [liked]);

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
    {isLoggedIn() &&
      <Button
        style={{ width: 90 }}
        variant="outlined"
        size="large"
        color="error"
        onClick={toggleLike}>
        <span style={{ marginRight: 10 }}>{likesTotal}</span>
        {liked ? <Favorite/> : <FavoriteBorder/>}
      </Button>
    }
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

export function CollectionCard(props: ICardCollection) {

  return (

    <div className="bg"
         style={{
           textAlign: 'center',
           paddingTop: 15,
           marginBottom: 15,
           paddingBottom: 15,
           marginLeft: 15,
           border: '1px solid gray',
         }}
    >
      <Grid container>
        <Grid item
              xs={2}>
          {isCurrentUser(props.userId) &&
            <ToolsAuth id={props.id}/>
          }
        </Grid>
        <Grid item
              xs={8}>
          <div style={{ borderBottom: '1px solid white' }}>
            <Typography display={'inline'}
                        variant="h3"
                        color={'white'}
                        style={{ textShadow: '2px 2px 4px black' }}>
              {props.name}
            </Typography>
          </div>

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
