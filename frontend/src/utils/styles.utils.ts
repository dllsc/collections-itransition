import { getImageUrl } from './image.utils';

export function imageToBackground(image: string): string {
  return `url(${getImageUrl(image)})`;
}
