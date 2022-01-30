import React, { CSSProperties } from 'react';
import { Close, Save } from '@mui/icons-material';
import { ImageInput } from './image-input.component';
import { useFormContext, useWatch } from 'react-hook-form';
import { ICollectionForm } from '../ReadCollection/models';
import Button from '@mui/material/Button';
import { getImageUrl } from '../../utils/image.utils';

export interface IImagePreviewProps {
  readonly itemIndex: number;
  readonly width: number;
}

export function ImagePreview(props: IImagePreviewProps) {
  const width = props.width;
  const height = (width / 16) * 5;
  const { getValues, setValue } = useFormContext<ICollectionForm>();
  const image: FileList = useWatch<ICollectionForm>({ name: `items.${props.itemIndex}.image` });
  const fileUrl = image.length && URL.createObjectURL(image[0]);
  const currentItemFormValue = getValues().items[props.itemIndex];
  const editValue = getValues().editCollection?.items.find(item => item.id === currentItemFormValue.id);
  const editItemFullImageUrl = editValue && getImageUrl(editValue.image);
  const imageUrl = fileUrl || editItemFullImageUrl;
  const previewFormStyles: CSSProperties = { borderRadius: '10px', width, height };
  let input: HTMLInputElement | null = null;

  const clearImage = () => setValue(`items.${props.itemIndex}.image`, new DataTransfer().files);

  return <>
    {imageUrl && <div style={{ ...previewFormStyles, position: 'relative' }}>
      <img style={{ ...previewFormStyles, objectFit: 'cover' }}
           alt="Image preview"
           src={imageUrl}/>

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 5,
      }}>
        {!!fileUrl && !!editValue &&
          <Button onClick={clearImage}
                  style={{ marginRight: 5 }}
                  size="small"
                  variant="contained"
                  color="warning">
            <Close/>
            Clear
          </Button>
        }
        <Button onClick={() => input?.click()}

                size="small"
                variant="contained">
          <Save/>
          Select
        </Button>
      </div>
    </div>}

    <div style={imageUrl ? { display: 'none' } : {}}>
      <ImageInput style={previewFormStyles}
                  imageInputRef={e => input = e}
                  itemIndex={props.itemIndex}/>
    </div>
  </>;
}
