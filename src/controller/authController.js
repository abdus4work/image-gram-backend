import { StatusCodes } from 'http-status-codes';

import AuthService from '../service/authService.js';

const authService = new AuthService();

class AuthController{
  async signup(req,res){
    try{
      const user = await authService.signup(req.body);
      return res.status(StatusCodes.CREATED).json(user);
    }catch (err){
      console.log(err);
      return res.status(err.statusCode || 500).json(err);
    }
  }
}

export default AuthController;