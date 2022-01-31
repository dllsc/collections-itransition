import { useParams } from 'react-router-dom';
import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { get } from '../../axios-instance';
import {
  FormControl, FormControlLabel,
  Grid,
  IconButton, InputLabel, InputProps, MenuItem,
  Select, SelectChangeEvent, Switch, SwitchProps, SwitchState,
} from '@mui/material';
import { appHistory } from '../../utils/history.utils';
import { ICollection } from './models';
import {
  ArrowBackIos,
  ArrowForwardIos,

} from '@mui/icons-material';
import { CollectionCard } from './collection-card.component';
import { CollectionToolbar } from './collection-toolbar.component';


export function CollectionsListComponent() {
  const params = useParams<{ page: string, limit: string }>();
  const [isLoading, setLoading] = useState(true);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [limit, setLimit] = useState(params.limit);
  const [checked, setChecked] = useState(false);
  const [url, setUrl] = useState('page');

  const switchEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
      const href = `/collection/all/0/${params.limit}`;
      appHistory.push(href);
    if (!event.target.checked) {
      get<ICollection[]>(`collection/page/${params.page}/${params.limit}`).then(data => {
        setCollections(data);
        setLoading(false);
        setUrl('page');
        console.log(url);
      });
    } else {
      setLoading(true);
      get<ICollection[]>(`collection/liked/${params.page}/${params.limit}`).then(data => {
          setCollections(data);
          setLoading(false);
          setUrl('liked');
          console.log(url);
        }
      );
    }

    setChecked(event.target.checked);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLimit(event.target.value);
     const href = `/collection/all/0/${event.target.value}`;
     appHistory.push(href);
    get<ICollection[]>(`collection/${url}/0/${event.target.value}`).then(data => {
      setCollections(data);
    });

  };

  const goNext = () => {

    if (!(collections.length < parseInt(params.limit) || parseInt(params.limit)==0)) {
      const href = `/collection/all/${parseInt(params.page) + 1}/${params.limit}`;

      get<ICollection[]>(`collection/${url}/${parseInt(params.page) + 1}/${params.limit}`).then(data => {
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
      get<ICollection[]>(`collection/${url}/${parseInt(params.page) - 1}/${params.limit}`).then(data => {
        setCollections(data);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    get<ICollection[]>(`collection/${url}/${params.page}/${params.limit}`).then(data => {
      setCollections(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }


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
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
          <FormControlLabel control={<Switch
            aria-label={'123'}
            color={'error'}
            checked={checked}
            onChange={switchEvent}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label="Favorite" />

          <FormControl style={{ width: 100, marginRight: 20, marginTop: 20 }}>
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
          <CollectionToolbar/>
        </div>
        <Grid container>
          {collections.map(c => <Grid item
                                      xs={6}
                                      key={c.id}>
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
