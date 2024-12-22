import express from 'express';

import connectDB from './configs/db.config.js';
import configs from './configs/server.config.js';
import apiRouter from './routes/api.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRouter);

app.listen(configs.PORT,()=>{
    console.log(`Server is running on port ${configs.PORT}`);
    connectDB();
})