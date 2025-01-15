export const swaggerSignUpSchema = {
  type: 'object',
  properties: {
    fullName: {
      type: 'string',
      example: 'John Doe'
    },
    email: {
      type: 'string',
      example: 'jhon@doe.com'
    },
    username: {
      type: 'string',
      example: 'jhon123'
    },
    password: {
      type: 'string',
      example: 'password'
    }
  }
};

export const swaggerSignUpSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 201
    },
    message: {
      type: 'string',
      example: 'User registered successfully'
    },
    data: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60f2e7e4b5a8b50015e6d1b5'
            },
            fullName: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              example: 'jhon@doe.com'
            },
            username: {
              type: 'string',
              example: 'jhon123'
            },
            avatar: {
              type: 'string',
              example: 'http://localhost:5000/uploads/avatar.png'
            },
            createdAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            },
            updatedAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            }
          }
        },
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjJlN2U0YjVhOGI1MDAxNWU2ZDFiNSIsImlhdCI6MTYyNjg4NzI3MiwiZXhwIjoxNjI2ODkxMDcyfQ.1x7t0UJWdXh9V2X5v9T5n4ZV3zD2l3VQ8JL5e2lJ2'
        },
        refreshToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjJlN2U0YjVhOGI1MDAxNWU2ZDFiNSIsImlhdCI6MTYyNjg4NzI3MiwiZXhwIjoxNjI2ODkxMDcyfQ.1x7t0UJWdXh9V2X5v9T5n4ZV3zD2l3VQ8JL5e2lJ2'
        }
      }
    },
    timestamp: {
      type: 'string',
      example: '2025-01-09T06:10:03.965Z'
    }
  }
};

export const swaggerSignUpConflictSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: '409'
    },
    errorCode: {
      type: 'string',
      example: 'ERR_DUPLICATE_KEY'
    },
    message: {
      type: 'string',
      description: 'Error Message',
      example: 'User with this email or username already exists'
    },
    details: {
      type: 'string',
      description: 'Error message'
    },
    data: {
      type: 'object',
      properties: {
        inputData: {
          type: 'object',
          description: 'Contains input data'
        }
      }
    }
  }
};

export const swaggerSignUpBadRequestSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: '409'
    },
    errorCode: {
      type: 'string',
      example: 'ERR_INVALID_INPUT'
    },
    message: {
      type: 'string',
      example: 'username: String must contain at least 3 character(s)'
    },
    details: {
      type: 'string',
      description: 'username is too small'
    },
    data: {
      type: 'object',
      properties: {
        inputData: {
          type: 'object',
          properties: {
            fullName: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              example: 'john@doe.com'
            },
            username: {
              type: 'string',
              example: 'jh'
            },
            password: {
              type: 'string',
              example: '******'
            }
          }
        }
      }
    }
  }
};

export const swaggerLoginSchema = {
  type: 'object',
  properties: {
    identifier: {
      type: 'string',
      example: 'jhon123'
    },
    password: {
      type: 'string',
      example: 'password'
    }
  }
};

export const swaggerLoginSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 200
    },
    message: {
      type: 'string',
      example: 'User logged in successfully'
    },
    data: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60f2e7e4b5a8b50015e6d1b5'
            },
            fullName: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              example: 'jhon@doe.com'
            },
            username: {
              type: 'string',
              example: 'jhon123'
            },
            avatar: {
              type: 'string',
              example: 'http://localhost:5000/uploads/avatar.png'
            },
            createdAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            },
            updatedAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            }
          }
        },
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjJlN2U0YjVhOGI1MDAxNWU2ZDFiNSIsImlhdCI6MTYyNjg4NzI3MiwiZXhwIjoxNjI2ODkxMDcyfQ.1x7t0UJWdXh9V2X5v9T5n4ZV3zD2l3VQ8JL5e2lJ2'
        },
        refreshToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjJlN2U0YjVhOGI1MDAxNWU2ZDFiNSIsImlhdCI6MTYyNjg4NzI3MiwiZXhwIjoxNjI2ODkxMDcyfQ.1x7t0UJWdXh9V2X5v9T5n4ZV3zD2l3VQ8JL5e2lJ2'
        }
      }
    },
    timestamp: {
      type: 'string',
      example: '2025-01-09T06:10:03.965Z'
    }
  }
};

export const swaggerLoginBadRequestSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: '400'
    },
    errorCode: {
      type: 'string',
      description: 'Error code'
    },
    message: {
      type: 'string',
      description: 'Error message'
    },
    details: {
      type: 'object',
      description: 'Error details'
    },
    data: {
      type: 'object',
      description: 'Contains input data'
    }
  }
};

export const swaggerLoginUnauthorizedSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: '401'
    },
    errorCode: {
      type: 'string',
      description: 'Error code'
    },
    message: {
      type: 'string',
      description: 'Error message'
    },
    details: {
      type: 'object',
      description: 'Error details'
    },
    data: {
      type: 'object',
      description: 'Contains input data'
    }
  }
};

export const swaggerRefreshTokenSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 200
    },
    message: {
      type: 'string',
      example: 'Token refreshed successfully'
    },
    data: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjJlN2U0YjVhOGI1MDAxNWU2ZDFiNSIsImlhdCI6MTYyNjg4NzI3MiwiZXhwIjoxNjI2ODkxMDcyfQ.1x7t0UJWdXh9V2X5v9T5n4ZV3zD2l3VQ8JL5e2lJ2'
        }
      }
    },
    timestamp: {
      type: 'string',
      example: '2025-01-09T06:10:03.965Z'
    }
  }
};

export const swaggerRefreshTokenBadRequestSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 400
    },
    errorCode: {
      type: 'string',
      example: 'ERR_INVALID_INPUT'
    },
    message: {
      type: 'string',
      example: 'Refresh token is missing'
    },
    details: {
      type: 'string',
      example: 'Refresh token is missing'
    },
    data: {
      type: 'object'
    }
  }
};

export const swaggerServerErrorSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 500
    },
    errorCode: {
      type: 'string',
      example: 'ERR_SERVER_ERROR'
    },
    message: {
      type: 'string',
      example: 'Internal server error'
    },
    details: {
      type: 'string',
      example: 'Internal server error'
    },
    data: {
      type: 'object'
    }
  }
};

export const swaggerRefreshTokenUnauthorizedSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 401
    },
    errorCode: {
      type: 'string',
      example: 'ERR_UNAUTHORIZED'
    },
    message: {
      type: 'string'
    },
    details: {
      type: 'string',
      nullable: true,
      example: 'null'
    },
    data: {
      type: 'object'
    }
  }
};

export const swaggerLogoutSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 200
    },
    message: {
      type: 'string',
      example: 'User logged out successfully'
    },
    data: {
      type: 'object',
      nullable: true,
      example: 'null'
    },
    timestamp: {
      type: 'string',
      example: '2025-01-09T06:10:03.965Z'
    }
  }
};

export const swaggerLogoutUnauthorizedSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 401
    },
    errorCode: {
      type: 'string',
      example: 'ERR_UNAUTHORIZED'
    },
    message: {
      type: 'string',
      example: 'Refresh token is missing'
    },
    details: {
      type: 'string',
      nullable: true,
      example: 'Refresh token is missing'
    },
    data: {
      type: 'object'
    }
  }
};

export const swaggerGetUserSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 200
    },
    message: {
      type: 'string',
      example: 'Success'
    },
    data: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60f2e7e4b5a8b50015e6d1b5'
            },
            fullName: {
              type: 'string',
              example: 'John Doe'
            },
            role: {
              type: 'string',
              example: 'user'
            },
            email: {
              type: 'string',
              example: 'john@doe.com'
            },
            username: {
              type: 'string',
              example: 'jhon123'
            },
            avatar: {
              type: 'string',
              example: 'http://localhost:5000/uploads/avatar.png'
            },
            createdAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            },
            updatedAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            }
          }
        }
      }
    }
  }
};

export const swaggerGetUserUnauthorizedSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 401
    },
    errorCode: {
      type: 'string',
      example: 'ERR_UNAUTHORIZED'
    },
    message: {
      type: 'string',
      example: 'Unauthorized'
    },
    details: {
      type: 'string',
      nullable: true,
      example: 'Unauthorized'
    },
    data: {
      type: 'object'
    }
  }
};

export const swaggerGetUserNotFoundSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 404
    },
    errorCode: {
      type: 'string',
      example: 'ERR_NOT_FOUND'
    },
    message: {
      type: 'string',
      example: 'User not found'
    },
    details: {
      type: 'string',
      nullable: true,
      example: 'User not found'
    },
    data: {
      type: 'object'
    }
  }
};

export const swaggerPostSchema = {
  type: 'object',
  properties: {
    caption: {
      type: 'string',
      example: 'Post caption'
    },
    image: {
      type: 'string',
      example: 'image url'
    }
  }
};

export const swaggerPostSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 201
    },
    message: {
      type: 'string',
      example: 'Post created successfully'
    },
    data: {
      type: 'object',
      properties: {
        post: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60f2e7e4b5a8b50015e6d1b5'
            },
            caption: {
              type: 'string',
              example: 'Post caption'
            },
            image: {
              type: 'string',
              example: 'image url'
            },
            user: {
              type: 'string',
              example: '60f2e7e4b5a8b50015e6d1b5'
            },
            comments: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: []
            },
            likes: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: []
            },
            createdAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            },
            updatedAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            }
          }
        }
      }
    },
    timestamp: {
      type: 'string',
      example: '2025-01-09T06:10:03.965Z'
    }
  }
};

export const swaggerUnauthorizedSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 401
    },
    errorCode: {
      type: 'string',
      example: 'ERR_UNAUTHORIZED'
    },
    message: {
      type: 'string',
      example: 'Unauthorized'
    },
    details: {
      type: 'string',
      nullable: true,
      example: 'null'
    },
    data: {
      type: 'object'
    }
  }
};

export const swaggerPostBadRequestSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 400
    },
    errorCode: {
      type: 'string',
      example: 'ERR_INVALID_INPUT'
    },
    message: {
      type: 'string',
      example: 'caption: String must contain at least 3 character(s)'
    },
    details: {
      type: 'string',
      example: 'caption is too small'
    },
    data: {
      type: 'object',
      properties: {
        inputData: {
          type: 'object',
          properties: {
            caption: {
              type: 'string',
              example: 'Po'
            },
            image: {
              type: 'string',
              example: 'image url'
            }
          }
        }
      }
    }
  }
};

export const swaggerGenerateSignedUrlSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 200
    },
    message: {
      type: 'string',
      example: 'Signed url generated successfully'
    },
    data: {
      type: 'object',
      properties: {
        signedUrl: {
          type: 'string',
          example: 'signed url'
        },
        timestamp: {
          type: 'string',
          example: '2025-01-09T06:10:03.965Z'
        }
      }
    },
    timestamp: {
      type: 'string',
      example: '2025-01-09T06:10:03.965Z'
    }
  }
};

export const swaggerImageUploadSchema = {
  type: 'object',
  properties: {
    file: {
      type: 'file',
      example: 'image file'
    },
    signature: {
      type: 'string',
      example: 'signature'
    },
    timestamp: {
      type: 'string',
      example: 'timestamp'
    },
    api_key: {
      type: 'string',
      example: 'api_key'
    }
  }
};

export const swaggerImageUploadSuccessSchema = {
  type: 'object',
  properties: {
    asset_id: {
      type: 'string',
      example: 'asset_id'
    },
    public_id: {
      type: 'string',
      example: 'public_id'
    },
    version: {
      type: 'number',
      example: 1
    },
    version_id: {
      type: 'string',
      example: 'version_id'
    },
    signature: {
      type: 'string',
      example: 'signature'
    },
    width: {
      type: 'number',
      example: 100
    },
    height: {
      type: 'number',
      example: 100
    },
    format: {
      type: 'string',
      example: 'jpg'
    },
    resource_type: {
      type: 'string',
      example: 'image'
    },
    created_at: {
      type: 'string',
      example: '2025-01-09T06:10:03.965Z'
    },
    tags: {
      type: 'array',
      items: {
        type: 'string'
      },
      example: []
    },
    bytes: {
      type: 'number',
      example: 100
    },
    type: {
      type: 'string',
      example: 'upload'
    },
    etag: {
      type: 'string',
      example: 'etag'
    },
    placeholder: {
      type: 'boolean',
      example: false
    },
    url: {
      type: 'string',
      example: 'url'
    },
    secure_url: {
      type: 'string',
      example: 'secure_url'
    },
    original_filename: {
      type: 'string',
      example: 'original_filename'
    }
  }
};

export const swaggerGetAllPostsSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 200
    },
    message: {
      type: 'string',
      example: 'success'
    },
    data: {
      type: 'object',
      properties: {
        posts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                example: '60f2e7e4b5a8b50015e6d1b5'
              },
              caption: {
                type: 'string',
                example: 'Post caption'
              },
              image: {
                type: 'string',
                example: 'image url'
              },
              user: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '60f2e7e4b5a8b50015e6d1b5'
                  },
                  fullName: {
                    type: 'string',
                    example: 'John Doe'
                  },
                  username: {
                    type: 'string',
                    example: 'jhon123'
                  },
                  avatar: {
                    type: 'string',
                    example: 'http://localhost:5000/uploads/avatar.png'
                  }
                }
              },
              comments: {
                type: 'array',
                items: {
                  type: 'string',
                  example: '60f2e7e4b5a8b50015e6d1b5'
                }
              },
              likes: {
                type: 'array',
                items: {
                  type: 'string',
                  example: '60f2e7e4b5a8b50015e6d1b5'
                }
              },
              createdAt: {
                type: 'string',
                example: '2025-01-09T06:10:03.965Z'
              },
              updatedAt: {
                type: 'string',
                example: '2025-01-09T06:10:03.965Z'
              }
            }
          }
        },
        meta: {
          type: 'object',
          properties: {
            totalPosts: {
              type: 'number',
              example: 1
            },
            totalPages: {
              type: 'number',
              example: 1
            },
            page: {
              type: 'number',
              example: 1
            },
            limit: {
              type: 'number',
              example: 10
            }
          }
        }
      }
    }
  }
};

export const swaggerGetPostSuccessSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: true
    },
    statusCode: {
      type: 'number',
      example: 200
    },
    message: {
      type: 'string',
      example: 'success'
    },
    data: {
      type: 'object',
      properties: {
        posts: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '60f2e7e4b5a8b50015e6d1b5'
            },
            caption: {
              type: 'string',
              example: 'Post caption'
            },
            image: {
              type: 'string',
              example: 'image url'
            },
            user: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '60f2e7e4b5a8b50015e6d1b5'
                },
                fullName: {
                  type: 'string',
                  example: 'John Doe'
                },
                username: {
                  type: 'string',
                  example: 'jhon123'
                },
                avatar: {
                  type: 'string',
                  example: 'http://localhost:5000/uploads/avatar.png'
                }
              }
            },
            comments: {
              type: 'array',
              items: {
                type: 'string',
                example: '60f2e7e4b5a8b50015e6d1b5'
              }
            },
            likes: {
              type: 'array',
              items: {
                type: 'string',
                example: '60f2e7e4b5a8b50015e6d1b5'
              }
            },
            createdAt: {
              type: 'string',
              example: '2025-01-09T06:10:03.965Z'
            }
          }
        }
      }
    },
    timestamp: {
      type: 'string',
      example: '2025-01-09T06:10:03.965Z'
    }
  }
};

export const swaggerGetPostNotFoundSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: false
    },
    statusCode: {
      type: 'number',
      example: 404
    },
    errorCode: {
      type: 'string',
      example: 'ERR_NOT_FOUND'
    },
    message: {
      type: 'string',
      example: 'Post not found'
    },
    details: {
      type: 'object',
    },
    data: {
      type: 'object',
      properties:{
        inputData:{
          type: 'object',
          properties:{
            postId:{
              type: 'string',
              example: '60f2e7e4b5a8b50015e6d1b5'
            }
          }
        }
      }
    }
  }
};
