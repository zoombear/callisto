import dotenv from 'dotenv';
dotenv.config();

export default {
  CRYPTO_KEY: process.env.CRYPTO_KEY ?? ''
 }