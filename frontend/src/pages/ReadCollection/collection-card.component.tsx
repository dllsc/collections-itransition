import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import React from 'react';
import { appHistory } from '../../utils/history.utils';
import Button from '@mui/material/Button';
import { DeleteForeverOutlined, Edit, FavoriteBorder, ReadMore } from '@mui/icons-material';
import { imageToBackground } from '../../utils/styles.utils';

interface ToolsProps {
  readonly id: number;
}

interface ICardCollection {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
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

export function CollectionCard(props: ICardCollection) {

  return (

    <div className='bg' style={{
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
            <ToolsAuth id={props.id}/>
          </Grid>
          <Grid item
                xs={8}>
            <div style={{borderBottom: '1px solid white'}}>
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
