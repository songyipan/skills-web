import { randomBytes } from 'crypto';

export const genApiKey =  () => {
  const apiKey = randomBytes(32).toString('hex');
  return "sk-"+apiKey;
}