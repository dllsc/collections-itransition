import { useFormContext } from 'react-hook-form';
import { ICollectionForm } from '../ReadCollection/models';
import AddIcon from '@mui/icons-material/Add';
import React, { HTMLProps } from 'react';

interface IImageInputProps {
  readonly itemIndex: number;
  readonly imageInputRef: (element: HTMLInputElement | null) => any;
}

export function ImageInput(props: IImageInputProps & HTMLProps<HTMLDivElement>) {
  const { trigger, register } = useFormContext<ICollectionForm>();
  const imageInputFormControl = register(`items.${props.itemIndex}.image`, { onChange: () => trigger() });
  const inputId = `items.${props.itemIndex}.image.input`;

  return <label htmlFor={inputId}>
    <div style={{
      border: '3px dashed black',
      backgroundColor: 'rgb(250, 250, 250)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      ...props?.style,
    }}>
      <input id={inputId}
             type="file"
             style={{ display: 'none' }}
             {...imageInputFormControl}
             ref={e => {
               imageInputFormControl.ref(e);
               props.imageInputRef(e);
             }}/>
      <AddIcon/> Upload photo
    </div>
  </label>;
}
