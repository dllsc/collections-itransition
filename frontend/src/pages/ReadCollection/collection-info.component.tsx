import { Typography } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';

interface IInfoCollectionProps {
  readonly name: string;
  readonly description: string;
  readonly theme: string;
}

export function CollectionInfo(props: IInfoCollectionProps) {
  return <div className="collection-view__info">
    <div className="collection-view__title"
         style={{ textAlign: 'center' }}>
      <div style={{ borderBottom: '2px solid white', textAlign: 'center', paddingBottom: '20px' }}>
        <Typography display={'inline'}
                    variant="h3"
                    color={'white'}
                    style={{ textShadow: '2px 2px 4px black' }}>
          {props.name}
        </Typography>
      </div>

      <Typography color={'white'}
                  variant="h4"
                  style={{ textShadow: '2px 2px 4px black', paddingTop: '20px' }}>
        {props.theme}
      </Typography>

    </div>
    <MDEditor.Markdown className="collection-view__description"
                       source={props.description}/>
  </div>;
}
