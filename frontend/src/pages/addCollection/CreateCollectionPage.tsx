import { Grid } from '@mui/material';
import { CollectionForm } from './collectionForm';

export function CreateCollectionPage (){
  return <div>
    <Grid container>
      <Grid item xs={3}/>
      <Grid item xs={6}><CollectionForm/></Grid>
    </Grid>
  </div>
}
