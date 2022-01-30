import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { get } from '../../axios-instance';
import { Badge, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { appHistory } from '../../utils/history.utils';
import { ICollection } from './models';


interface ICardCollection {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
  readonly id: number;
}


function CollectionCard(props: ICardCollection) {
  const href = `/collection/read/${props.id}`;

  const goToCollection = () => appHistory.push(href);

  return <Badge badgeContent={props.theme}
                color="secondary">
    <Card sx={{ width: 300, background: '#f0bdfc9c' }}>

      <CardActionArea onClick={goToCollection}
                      sx={{ height: 300 }}>
        <CardContent>

          <Typography gutterBottom
                      variant="h4"
                      component="div"
                      align="center"
          >
            {props.name}
          </Typography>

          <Typography variant="body2"
                      color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>
  </Badge>;

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

  return <div>
    <div>

    </div>
  </div>;

}
