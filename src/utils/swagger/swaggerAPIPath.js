export const swaggerAPIPath = {
  // TODO 🔐: implement the swagger API path
  '/api/v1/auth/signup': {
    post: {
      summary: 'Create user',
      tags: ['🔐 Auth'],
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Signup'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'user created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupResponse'
              }
            }
          }
        },
        409: {
          description: 'user already exists',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupConflict'
              }
            }
          }
        },
        400: {
          description: 'invalid input',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupBadRequest'
              }
            }
          }
        },
        500: {
          description: 'server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },

  '/api/v1/auth/login': {
    post: {
      summary: 'User login',
      security: [],
      tags: ['🔐 Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Login'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'User logged in successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginSuccess'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginUnauthorized'
              }
            }
          }
        },
        400: {
          description: 'Invalid input',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginBadRequest'
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },

  '/api/v1/auth/refresh-token': {
    post: {
      summary: 'Generate new token',
      tags: ['🔐 Auth'],
      security: [
        {
          cookieAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Token generated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RefreshTokenSuccess'
              }
            }
          }
        },
        400: {
          description: 'Invalid input',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RefreshTokenBadRequest'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RefreshTokenUnauthorized'
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },

  '/api/v1/auth/logout': {
    post: {
      summary: 'User logout',
      tags: ['🔐 Auth'],
      responses: {
        200: {
          description: 'User logged out successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LogoutSuccess'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LogoutUnauthorized'
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },

  '/api/v1/users/{username}': {
    get: {
      summary: 'Get user by username',
      tags: ['👤 User'],
      parameters: [
        {
          name: 'username',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetUserSuccess'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetUserUnauthorized'
              }
            }
          }
        },
        404: {
          description: 'User not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetUserNotFound'
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    },
    delete: {
      summary: 'Delete user',
      tags: ['👤 User'],
      parameters: [
        {
          name: 'username',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'User deleted successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetUserSuccess'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetUserUnauthorized'
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },


  '/api/v1/posts': {
    post: {
      summary: 'Create post',
      tags: ['📝 Post'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Post'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Post created successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostSuccess'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Unauthorized'
              }
            }
          }
        },
        400: {
          description: 'Invalid input',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PostBadRequest'
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    },
    get:{
      summary:'Get all posts',
      tags:['📝 Post'],
      parameters:[
        {
          name:'page',
          in:'query',
          schema:{
            type:'integer'
          }
        },
        {
          name:'limit',
          in:'query',
          schema: {
            type: 'integer'
          }
        }
      ],
      responses:{
        200:{
          description:'success',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/GetAllPostSuccess'
              }
            }
          }
        },
        401:{
          description:'Unauthorized',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/Unauthorized'
              }
            }
          }
        },
        500:{
          description:'Server error',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },
  '/api/v1/posts/generate-signed-url': {
    get: {
      summary: 'generate signed url',
      tags: ['📝 Post'],
      responses: {
        200: {
          description: 'signed url generated successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GenerateSignedUrl'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Unauthorized'
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },
  'https://api.cloudinary.com/v1_1/{cloud_name}/image/upload': {
    post: {
      summary: 'upload image',
      tags: ['📝 Post'],
      parameters: [
        {
          name: 'cloud_name',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/PostImageUpload'
            }
          }
        }
      },
      responses:{
        '200':{
          description:'Image uploaded successfully',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/PostImageUploadSuccess'
              }
            }
          }
        }
      }
    }
  },
  '/api/v1/users/{userId}/posts': {
    get: {
      summary: 'Get all posts by user',
      tags: ['👤 User'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          }
        },
        {
          name: 'page',
          in: 'query',
          schema: {
            type: 'integer'
          }
        },
        {
          name: 'limit',
          in: 'query',
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        200: {
          description: 'success',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetAllPostSuccess'
              }
            }
          }
        },
        401: {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Unauthorized'
              }
            }
          }
        },
        500: {
          description: 'Server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },
  '/api/v1/posts/{postId}': {
    get:{
      summary:'Get post by id',
      tags:['📝 Post'],
      parameters:[
        {
          name:'postId',
          in:'path',
          required:true,
          schema:{
            type:'string'
          }
        }
      ],
      responses:{
        200:{
          description:'success',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/GetPostSuccess'
              }
            }
          }
        },
        401:{
          description:'Unauthorized',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/Unauthorized'
              }
            }
          }
        },
        404:{
          description:'Post not found',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/PostNotFound'
              }
            }
          }
        },
        500:{
          description:'Server error',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    },
    delete:{
      summary:'Delete post',
      tags:['📝 Post'],
      parameters:[
        {
          name:'postId',
          in:'path',
          required:true,
          schema:{
            type:'string'
          }
        }
      ],
      responses:{
        200:{
          description:'Post deleted successfully',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/GetPostSuccess'
              }
            }
          }
        },
        401:{
          description:'Unauthorized',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/Unauthorized'
              }
            }
          }
        },
        500:{
          description:'Server error',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },
  'api/v1/posts/{postId}/comments': {
    get:{
      summary:'Get all comments by post id',
      tags:['📝 Post'],
      parameters:[
        {
          name:'postId',
          in:'path',
          required:true,
          schema:{
            type:'string'
          }
        },
        {
          name:'page',
          in:'query',
          schema:{
            type:'integer'
          }
        },
        {
          name:'limit',
          in:'query',
          schema:{
            type:'integer'
          }
        }
      ],
      responses:{
        200:{
          description:'success',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/GetAllCommentsByPostId'
              }
            }
          }
        },
        401:{
          description:'Unauthorized',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/Unauthorized'
              }
            }
          }
        },
        500:{
          description:'Server error',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  },
  'api/v1/posts/{postId}/likes': {
    get:{
      summary:'Get all likes by post id',
      tags:['📝 Post'],
      parameters:[
        {
          name:'postId',
          in:'path',
          required:true,
          schema:{
            type:'string'
          }
        },
        {
          name:'page',
          in:'query',
          schema:{
            type:'integer'
          }
        },
        {
          name:'limit',
          in:'query',
          schema:{
            type:'integer'
          }
        }
      ],
      responses:{
        200:{
          description:'success',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/GetAllLikesByPostId'
              }
            }
          }
        },
        401:{
          description:'Unauthorized',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/Unauthorized'
              }
            }
          }
        },
        500:{
          description:'Server error',
          content:{
            'application/json':{
              schema:{
                $ref:'#/components/schemas/ServerError'
              }
            }
          }
        }
      }
    }
  }
};
