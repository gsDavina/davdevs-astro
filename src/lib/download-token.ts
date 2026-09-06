import { randomBytes } from 'node:crypto';

const DOWNLOAD_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function generateDownloadToken() {
  return randomBytes(32).toString('hex');
}

export function downloadTokenExpiry(from = new Date()) {
  return new Date(from.getTime() + DOWNLOAD_TOKEN_TTL_MS);
}
