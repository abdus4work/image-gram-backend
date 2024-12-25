import jwt from 'jsonwebtoken';

import configs from '../configs/serverConfig.js';
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

  // TODO Implement login method

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

  async generateNewAccessToken(refreshToken) {}
}

export default AuthService;
