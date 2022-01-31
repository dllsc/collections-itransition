import { apiUrl } from '../environment-variables';

export function getImageUrl(image: string): string {
  return `${apiUrl}/images/${image}`;
}
