import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

import connectDB from './configs/dbConfig.js';
import configs from './configs/serverConfig.js';
import errorHandlingMiddleware from './middleware/errorMiddleware.js';
import apiRouter from './routes/apiRoutes.js';
import { swaggerDocs, swaggerUiOptions } from './utils/swagger/swagger.js';

const app = express();
const limiter=rateLimit({
  windowMs: 15*60*1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
})
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(cors(corsOptions));

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs, swaggerUiOptions)
);

app.use(errorHandlingMiddleware);

app.listen(configs.PORT, () => {
  console.log(`Server is running on port ${configs.PORT}`);
  connectDB();
});
