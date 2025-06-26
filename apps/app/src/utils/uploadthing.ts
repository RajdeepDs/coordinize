import { generateReactHelpers } from '@coordinize/storage/client';
import type { router } from './upload';

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<typeof router>();
