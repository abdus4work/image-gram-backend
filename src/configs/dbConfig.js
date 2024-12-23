import mongoose from 'mongoose';

import configs from './server.config.js';

export default async function connectDB() {
  try {
    await mongoose.connect(configs.DB_URL);
    console.log(`Connected to database from ${configs.NODE_ENV} environment`);
  } catch (err) {
    console.log('Error connecting to database: ', err);
  }
}
