import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton/IconButton';
import { IconButton } from '@mui/material';

interface ExpandProps {
  expand: boolean;
}

export const ExpandMore = styled((props: ExpandProps & IconButtonProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
