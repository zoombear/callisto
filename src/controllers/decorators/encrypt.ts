import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import vars from '../../config';
const algorithm = 'aes-256-ctr';
const iv = randomBytes(16);
const crypto_key = vars.CRYPTO_KEY;

export const encrypt = function(text:string): {iv:string, encryptedData:string} {
  let cipher = createCipheriv(algorithm, Buffer.from(crypto_key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

export const decrypt = function(text:{iv:string, encryptedData:string}): string {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = createDecipheriv(algorithm, Buffer.from(crypto_key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
 }