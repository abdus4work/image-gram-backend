import { StatusCodes } from 'http-status-codes';

import AuthService from '../service/authService.js';
import SuccessResponse from '../utils/common/successResponse.js';

const authService = new AuthService();

class AuthController{
  async signup(req,res){
    try{
      const data = await authService.signup(req.body);

      return res.status(StatusCodes.CREATED).json(
        new SuccessResponse(
          StatusCodes.CREATED,
          "user created successfully",
          data
        )
      );
    }catch (err){
      console.log(err);
      return res.status(err.statusCode || 500).json(err);
    }
  }
}

export default AuthController;