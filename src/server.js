import cookieParser from 'cookie-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import connectDB from './configs/dbConfig.js';
import configs from './configs/serverConfig.js';
import errorHandlingMiddleware from './middleware/errorMiddleware.js';
import apiRouter from './routes/apiRoutes.js';
import swaggerDocs from './utils/swagger/swagger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api', apiRouter);

/**
 * @swagger
 * /ping:
 *   get:
 *     description: Returns pong
 *     responses:
 *       200:
 *         description: pong
 */
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandlingMiddleware);

app.listen(configs.PORT, () => {
  console.log(`Server is running on port ${configs.PORT}`);
  connectDB();
});
