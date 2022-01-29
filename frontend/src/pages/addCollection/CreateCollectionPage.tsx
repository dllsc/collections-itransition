import { Grid } from '@mui/material';
import { CollectionForm } from './collectionForm';

export function CreateCollectionPage (){
  return <div>
    <Grid container>
      <Grid item xs={4}/>
      <Grid item xs={4}><CollectionForm/></Grid>
    </Grid>
  </div>
}
