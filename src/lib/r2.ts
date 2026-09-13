import { S3Client } from '@aws-sdk/client-s3';

const endpoint = import.meta.env.OBJECT_STORAGE_ENDPOINT;
const accessKeyId = import.meta.env.OBJECT_STORAGE_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.OBJECT_STORAGE_SECRET_ACCESS_KEY;
export const OBJECT_STORAGE_BUCKET = import.meta.env.OBJECT_STORAGE_BUCKET;

if (!endpoint || !accessKeyId || !secretAccessKey || !OBJECT_STORAGE_BUCKET) {
  throw new Error(
    'OBJECT_STORAGE_ENDPOINT / OBJECT_STORAGE_BUCKET / OBJECT_STORAGE_ACCESS_KEY_ID / OBJECT_STORAGE_SECRET_ACCESS_KEY is not set'
  );
}

export const r2 = new S3Client({
  region: 'auto',
  endpoint,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
});
