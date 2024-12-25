import express from 'express';

import connectDB from './configs/dbConfig.js';
import configs from './configs/serverConfig.js';
import errorHandlingMiddleware from './middleware/errorMiddleware.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.use(errorHandlingMiddleware);

app.listen(configs.PORT, () => {
  console.log(`Server is running on port ${configs.PORT}`);
  connectDB();
});
