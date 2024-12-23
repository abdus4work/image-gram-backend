import jwt from 'jsonwebtoken';

import UserRepository from '../repository/userRepository.js';
import configs from '../configs/serverConfig.js';
import CustomError from '../utils/error/customError.js';

const userRepository = new UserRepository();

class AuthService{

  async signup(data){
    try{
      const user = await userRepository.create(data);
      if(!user){
        throw new CustomError(400,'User not created','ERR_USER_NOT_CREATED');
      }
      return user;
    }catch (err){
      if(err.name==='ValidationError'){
        throw new CustomError(404,'ERR_VALIDATION',err.message,err.errors);
      }
      console.log(err.message);
      throw new CustomError(422,err.message,err.code);
    }
  }

  generateAccessToken(payload){
    return jwt.sign(payload,configs.JWT_ACCESS_SECRET,{expiresIn: configs.JWT_ACCESS_EXPIRY});
  }

  generateRefreshToken(payload){
    return jwt.sign(payload,configs.JWT_REFRESH_SECRET,{expiresIn: configs.JWT_REFRESH_EXPIRY});
  }

  verifyToken(token,secret){
    return jwt.verify(token,secret);
  }
}

export default AuthService;