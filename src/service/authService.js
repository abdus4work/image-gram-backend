import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import configs from '../configs/serverConfig.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';
import UserService from './userService.js';

const userService = new UserService();

class AuthService {
  async signup(data) {
    const user = await userService.createUser(data);
    // Generating access token
    const accessToken = this.generateAccessToken({
      id: user._id,
      email: user.email,
      username: user.username
    });

    // Generating refresh token
    const refreshToken = this.generateRefreshToken({ id: user._id });

    // Updating user with refresh token
    const updatedUser = await userService.updateUser(user._id, {
      refreshToken
    });

    return {
      user: updatedUser,
      accessToken,
      refreshToken
    };
  }

  async signIn(data){
    const user = await userService.getByEmailOrUsername(data.identifier);
    if(!user){
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        ErrorCodes.USER_NOT_FOUND,
        'User not found'
      );
    }

    console.log(user);

    const isPasswordValid = await userService.comparePassword(data.password, user.password);
    if(!isPasswordValid){
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        ErrorCodes.UNAUTHORIZED,
        'Invalid password'
      );
    }

    const accessToken = this.generateAccessToken({id: user._id, email: user.email, username: user.username});
    const refreshToken = this.generateRefreshToken({id: user._id});
    await userService.updateUser(user._id, {refreshToken});
    return {
      user,
      accessToken,
      refreshToken
    }
  }

  async signOut(refreshToken){
    const {id} = this.verifyToken(refreshToken,configs.JWT_REFRESH_SECRET)
    const user = await userService.getUserById(id);
    if(user.refreshToken !== refreshToken){
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        ErrorCodes.UNAUTHORIZED,
        'Invalid token'
      )
    }
    await userService.updateUser(user._id, {refreshToken: ''});
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRY
    });
  }

  generateRefreshToken(payload) {
    return jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: configs.JWT_REFRESH_EXPIRY
    });
  }

  verifyToken(token, secret) {
    return jwt.verify(token, secret);
  }

  async generateNewAccessToken(refreshToken) {
    const { id } = this.verifyToken(refreshToken, configs.JWT_REFRESH_SECRET);
    const user = await userService.getUserById(id);
    if (user.refreshToken !== refreshToken) {
      throw new CustomError(
        StatusCodes.UNAUTHORIZED,
        ErrorCodes.UNAUTHORIZED,
        'Invalid token'
      );
    }

    const accessToken = this.generateAccessToken({
      id: user._id,
      email: user.email,
      username: user.username
    });

    const newRefreshToken = this.generateRefreshToken({ id: user._id });
    await userService.updateUser(user._id, {
      refreshToken: newRefreshToken
    });

    return {
      accessToken,
      refreshToken: newRefreshToken
    }
  }
}

export default AuthService;
