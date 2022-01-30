import { Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { ICollection, Item } from './models';
import { ArrowBack, Edit, FavoriteBorder } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { appHistory } from '../../utils/history.utils';
import { isLoggedIn } from '../../utils/login.utils';

interface IInfoCollectionProps {
  readonly collection: ICollection;
}

interface ICollectionInfoToolbarProps {
  readonly collection: ICollection;
}

function CollectionToolbar({ collection }: ICollectionInfoToolbarProps) {
  const marginRight = 10;

  return <div className="collection-view__toolbar">
    <Button variant="outlined"
            style={{ marginRight }}
            size="large"
            color="secondary"
            onClick={() => appHistory.goBack()}>
      <ArrowBack/> Go Back
    </Button>

    <Button variant="outlined"
            style={{ marginRight }}
            size="large"
            color="primary"
            onClick={() => appHistory.push(`/collection/edit/${collection.id}`)}>
      <Edit/> Edit
    </Button>

    <Button
      variant="outlined"
      size="large"
      color="error">
      <FavoriteBorder/> Like
    </Button>
  </div>;
}

export function CollectionInfo({ collection }: IInfoCollectionProps) {
  return <div className="collection-view__info">
    <div className="collection-view__title"
         style={{ textAlign: 'center' }}>
      {isLoggedIn() ? <CollectionToolbar collection={collection}/> : <div/>}

      <div>
        <div style={{ borderBottom: '2px solid white', textAlign: 'center', paddingBottom: '20px' }}>
          <Typography display={'inline'}
                      variant="h3"
                      color={'white'}
                      style={{ textShadow: '2px 2px 4px black' }}>
            {collection.name}
          </Typography>
        </div>

        <Typography color={'white'}
                    variant="h4"
                    style={{ textShadow: '2px 2px 4px black', paddingTop: '20px' }}>
          {collection.theme}
        </Typography>
      </div>
    </div>
    <MDEditor.Markdown className="collection-view__description"
                       source={collection.description}/>
  </div>;
}
