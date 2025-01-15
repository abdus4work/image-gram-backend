import swaggerJsDoc from 'swagger-jsdoc';

import { swaggerAPIPath } from './swaggerAPIPath.js';
import {
  swaggerGenerateSignedUrlSuccessSchema,
  swaggerGetAllPostsSuccessSchema,
  swaggerGetPostNotFoundSchema,
  swaggerGetPostSuccessSchema,
  swaggerGetUserNotFoundSchema,
  swaggerGetUserSuccessSchema,
  swaggerGetUserUnauthorizedSchema,
  swaggerImageUploadSchema,
  swaggerImageUploadSuccessSchema,
  swaggerLoginBadRequestSchema,
  swaggerLoginSchema,
  swaggerLoginSuccessSchema,
  swaggerLoginUnauthorizedSchema,
  swaggerLogoutSuccessSchema,
  swaggerLogoutUnauthorizedSchema,
  swaggerPostBadRequestSchema,
  swaggerPostSchema,
  swaggerPostSuccessSchema,
  swaggerRefreshTokenBadRequestSchema,
  swaggerRefreshTokenSuccessSchema,
  swaggerRefreshTokenUnauthorizedSchema,
  swaggerServerErrorSchema,
  swaggerSignUpBadRequestSchema,
  swaggerSignUpConflictSchema,
  swaggerSignUpSchema,
  swaggerSignUpSuccessSchema,
  swaggerUnauthorizedSchema
} from './swaggerSchema.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Image Gram API',
      version: '1.0.0'
    },
    paths: swaggerAPIPath,
    components: {
      schemas: {
        Signup: swaggerSignUpSchema,
        SignupResponse: swaggerSignUpSuccessSchema,
        SignupConflict: swaggerSignUpConflictSchema,
        SignupBadRequest:swaggerSignUpBadRequestSchema,
        Login: swaggerLoginSchema,
        LoginSuccess:swaggerLoginSuccessSchema,
        LoginBadRequest:swaggerLoginBadRequestSchema,
        LoginUnauthorized:swaggerLoginUnauthorizedSchema,
        RefreshTokenSuccess:swaggerRefreshTokenSuccessSchema,
        RefreshTokenBadRequest:swaggerRefreshTokenBadRequestSchema,
        ServerError:swaggerServerErrorSchema,
        RefreshTokenUnauthorized:swaggerRefreshTokenUnauthorizedSchema,
        LogoutSuccess:swaggerLogoutSuccessSchema,
        LogoutUnauthorized:swaggerLogoutUnauthorizedSchema,
        GetUserSuccess:swaggerGetUserSuccessSchema,
        GetUserUnauthorized:swaggerGetUserUnauthorizedSchema,
        GetUserNotFound: swaggerGetUserNotFoundSchema,
        Post:swaggerPostSchema,
        PostSuccess:swaggerPostSuccessSchema,
        Unauthorized:swaggerUnauthorizedSchema,
        PostBadRequest:swaggerPostBadRequestSchema,
        GenerateSignedUrl: swaggerGenerateSignedUrlSuccessSchema,
        PostImageUpload:swaggerImageUploadSchema,
        PostImageUploadSuccess:swaggerImageUploadSuccessSchema,
        GetAllPostSuccess:swaggerGetAllPostsSuccessSchema,
        GetPostSuccess:swaggerGetPostSuccessSchema,
        PostNotFound:swaggerGetPostNotFoundSchema
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ['./src/routes/v1/*.js'] // files containing annotations as above
};

export const swaggerUiOptions = {
  swaggerOptions: {
    defaultModelsExpandDepth: -1, // Hides models section entirely
  },
};

export const swaggerDocs = swaggerJsDoc(options);



