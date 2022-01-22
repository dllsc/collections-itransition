import { randomString } from './random-string.utils';

export function createImageFilename(userId: number, file: Express.Multer.File): string {
  return `${userId}.${randomString()}.${file.originalname}`;
}
