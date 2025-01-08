import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import configs from '../configs/serverConfig.js';
import CustomError from '../utils/error/customError.js';
import ErrorCodes from '../utils/error/errorCodes.js';
import {
  createUserService,
  getUserByEmailOrUsernameService,
  getUserByIdService,
  updateUserService
} from './userService.js';

export const signUpService = async (data) => {
  const user = await createUserService(data);
  // Generating access token
  const accessToken = await generateAccessTokenService({
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role
  });

  // Generating refresh token
  const refreshToken = await generateRefreshTokenService({ id: user._id });

  // Updating user with refresh token
  const updatedUser = await updateUserService(user._id, {
    refreshToken
  });

  // TODO: implement sending email

  return {
    user: updatedUser,
    accessToken,
    refreshToken
  };
};

export const loginService = async (data) => {
  const user = await getUserByEmailOrUsernameService(
    data.identifier,
    '-__v -refreshToken'
  );
  if (!user) {
    throw new CustomError(
      StatusCodes.NOT_FOUND,
      ErrorCodes.USER_NOT_FOUND,
      'User not found'
    );
  }

  const isPasswordValid = await comparePasswordService(
    data.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      ErrorCodes.UNAUTHORIZED,
      'Invalid password'
    );
  }

  const accessToken = await generateAccessTokenService({
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role
  });
  const refreshToken = await generateRefreshTokenService({ id: user._id });
  const updatedUser = await updateUserService(user._id, {
    refreshToken
  });
  return {
    updatedUser,
    accessToken,
    refreshToken
  };
};

export const logoutService = async (refreshToken) => {
  const { id } = await verifyTokenService(
    refreshToken,
    configs.JWT_REFRESH_SECRET
  );
  const user = await getUserByIdService(id);
  if (user.refreshToken !== refreshToken) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      ErrorCodes.UNAUTHORIZED,
      'Invalid token'
    );
  }
  await updateUserService(user._id, { refreshToken: '' });
};

export const generateNewAccessTokenService = async (refreshToken) => {
  const { id } = await verifyTokenService(
    refreshToken,
    configs.JWT_REFRESH_SECRET
  );
  const user = await getUserByIdService(id);
  if (user.refreshToken !== refreshToken) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      ErrorCodes.UNAUTHORIZED,
      'Invalid token'
    );
  }

  const accessToken = await generateAccessTokenService({
    id: user._id,
    email: user.email,
    username: user.username
  });

  const newRefreshToken = await generateRefreshTokenService({ id: user._id });
  await updateUserService(user._id, {
    refreshToken: newRefreshToken
  });

  return {
    accessToken,
    refreshToken: newRefreshToken
  };
};

export const generateAccessTokenService = async (payload) => {
  return jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
    expiresIn: configs.JWT_ACCESS_EXPIRY
  });
};

export const generateRefreshTokenService = async (payload) => {
  return jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
    expiresIn: configs.JWT_REFRESH_EXPIRY
  });
};

export const verifyTokenService = async (token, secret) => {
  return jwt.verify(token, secret);
};

export const comparePasswordService = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
