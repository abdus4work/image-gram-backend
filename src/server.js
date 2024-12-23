import express from 'express';

import connectDB from './configs/dbConfig.js';
import configs from './configs/serverConfig.js';
import apiRouter from './routes/apiRoutes.js';
import AuthService from './service/authService.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRouter);

app.post('/signup',async (req,res)=>{
    const authService = new AuthService();
    try{
        const user = await authService.signup(req.body);
        const accessToken = authService.generateAccessToken({id:user._id});
        const refreshToken = authService.generateRefreshToken({id:user._id});
        res.status(201).json({accessToken,refreshToken});
    }catch(err){
        res.status(err.statusCode).json(err.toJSON());
    }
})

app.listen(configs.PORT,()=>{
    console.log(`Server is running on port ${configs.PORT}`);
    connectDB();
})