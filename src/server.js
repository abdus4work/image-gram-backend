import express from 'express';

import connectDB from './configs/db.config.js';
import configs from './configs/server.config.js';

const app = express();



app.listen(configs.PORT,()=>{
    console.log(`Server is running on port ${configs.PORT}`);
    connectDB();
})