import swaggerJsDoc from 'swagger-jsdoc';

import {
  swaggerCommentCreateSchema, swaggerCommentResponseSchema,
  swaggerLikeCreateSchema, swaggerLikeResponseSchema,
  swaggerPostSchema, swaggerUserCreateSchema, swaggerUserLoginResponseSchema, swaggerUserLoginSchema,
  swaggerUserSchema, swaggerUserSignUpResponseSchema
} from './swaggerSchema.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Image Gram API',
      version: '1.0.0',
    },
    components:{
      schemas:{
        User: swaggerUserSchema,
        Post: swaggerPostSchema,
        LikeCreate: swaggerLikeCreateSchema,
        CommentCreate: swaggerCommentCreateSchema,
        CommentResponse: swaggerCommentResponseSchema,
        LikeResponse: swaggerLikeResponseSchema,
        UserCreate: swaggerUserCreateSchema,
        UserResponse: swaggerUserSignUpResponseSchema,
        Login: swaggerUserLoginSchema,
        LoginResponse: swaggerUserLoginResponseSchema
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

  apis:['./src/routes/v1/*.js'] // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(options);

export default swaggerDocs;