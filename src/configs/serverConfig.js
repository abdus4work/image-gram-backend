import dotenv from 'dotenv';
dotenv.config();

const configs = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV,
  get DB_URL() {
    return this.NODE_ENV === 'development'
      ? process.env.DEV_DB_URL
      : process.env.PROD_DB_URL;
  },
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRATION,
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRATION,
  DEFAULT_USER_IMAGE: process.env.DEFAULT_USER_IMAGE_URL,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS
};

export default configs;
