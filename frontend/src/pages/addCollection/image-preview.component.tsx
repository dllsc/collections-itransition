import { useEffect, useState } from 'react';

export interface IImagePreviewProps {
  readonly file?: File;
  readonly url?: string;
}

export function ImagePreview(props: IImagePreviewProps) {
  const [fileUrl, setFileUrl] = useState<string | null>();

  useEffect(() => {
    if (props.file) {
      setFileUrl(URL.createObjectURL(props.file));
    }
  }, [props.file]);

  return <img style={{ borderRadius: '10px', width: '150px', height: '85px' }}
              alt="Image preview"
              src={fileUrl || props.url}/>;
}
