import { Field, Item } from './models';
import { useState } from 'react';
import { Collapse, Typography } from '@mui/material';
import { ExpandMore } from './expand-mode.component';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { imageToBackground } from '../../utils/styles.utils';

interface FieldItemCardProps {
  field: Field;
  index: number;
}

export function FieldItemCard({ field, index }: FieldItemCardProps) {
  const fieldValue = field.values.split(',')[index];

  return <div className="collection-view__field">
    <div className="collection-view__field-title">{field.name}</div>
    <div className="collection-view__field-value">{fieldValue}</div>
  </div>;
}

interface ItemCardProps {
  item: Item;
  fields: Field[];
  index: number;
}

export function ItemCard(props: ItemCardProps) {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  return <div className="collection-view__item"
              style={{ backgroundImage: imageToBackground(props.item.image) }}>
    <div style={{ borderBottom: '2px solid white', textAlign: 'center', paddingTop: '20px' }}>
      <Typography display={'inline'}
                  variant="h3"
                  color={'white'}
                  style={{ textShadow: '3px 3px 7px black', paddingTop: '10vw' }}>
        {props.item.name}
      </Typography>
    </div>

    <div>
      <Collapse in={expanded}
                timeout="auto">
        {props.fields.map(field =>
          <FieldItemCard key={field.id}
                         index={props.index}
                         field={field}/>,
        )}
      </Collapse>
    </div>

    <div>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more">
        <ExpandMoreIcon style={{ color: 'white' }}/>
      </ExpandMore>
    </div>
  </div>;
}

