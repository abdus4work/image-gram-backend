export const swaggerUserSchema = {
  type:'object',
  properties:{
    _id:{
      type: 'string',
      description: 'User ID'
    },
    fullName:{
      type: 'string',
      description: 'User full name'
    },
    username:{
      type: 'string',
      description: 'User username'
    },
    email:{
      type: 'string',
      description: 'User email'
    },
    avatar:{
      type: 'string',
      description: 'User avatar'
    },
    role:{
      type: 'string',
      description: 'User role'
    },
    createdAt:{
      type: 'string',
      description: 'User created date'
    },
    updatedAt:{
      type: 'string',
      description: 'User updated date'
    }
  }
}

export const swaggerPostSchema={
  type: 'object',
  properties:{
    _id: {
      type: 'string',
      description: 'Post ID'
    },
    caption:{
      type: 'string',
      description: 'Post caption'
    },
    image:{
      type: 'string',
      description: 'Post image'
    },
    user:{
      type: 'string',
      description: 'User ID'
    },
    comments:{
      type: 'array',
      items:{
        type: 'object',
        properties:{
          _id:{
            type: 'string',
            description: 'Comment ID'
          },
          user:{
            type: 'object',
            properties:{
              _id:{
                type: 'string',
                description: 'User ID'
              },
              fullName:{
                type: 'string',
                description: 'User full name'
              },
              username:{
                type: 'string',
                description: 'User username'
              },
              avatar:{
                type: 'string',
                description: 'User avatar'
              }
            }
          },
          content:{
            type: 'string',
            description: 'Comment text'
          },
          replies:{
            type: 'array',
            items:{
              type: 'string'
            }
          },
          likes:{
            type: 'array',
            items:{
              type: 'string'
            }
          },
          createdAt:{
            type: 'string',
            description: 'Comment created date'
          },
        }
      }
    },
    likes:{
      type: 'array',
      items:{
        type: 'object',
        properties:{
          _id:{
            type: 'string',
            description: 'Like ID'
          },
          user:{
            type: 'object',
            properties:{
              _id:{
                type: 'string',
                description: 'User ID'
              },
              fullName:{
                type: 'string',
                description: 'User full name'
              },
              username:{
                type: 'string',
                description: 'User username'
              },
              avatar:{
                type: 'string',
                description: 'User avatar'
              }
            }
          },
          onModel:{
            type: 'string',
            description: 'Model name'
          }
        }
      }
    },
    createdAt:{
      type: 'string',
      description: 'Post created date'
    },
    updatedAt:{
      type: 'string',
      description: 'Post updated date'
    }
  }
}

export const swaggerLikeCreateSchema={
  type: 'object',
  properties:{
    onModel:{
      type: 'string',
      description: 'Model name'
    },
    user:{
      type: 'string',
      description: 'User ID'
    },
    likeableId:{
      type: 'string',
      description: 'Likeable ID'
    },
  }
}

export const swaggerCommentCreateSchema={
  type: 'object',
  properties:{
    content:{
      type: 'string',
      description: 'Comment text'
    },
    onModel:{
      type: 'string',
      description: 'Model name'
    },
    commentableId:{
      type: 'string',
      description: 'Commentable ID'
    }
  }
}

export const swaggerCommentResponseSchema={
  type: 'object',
  properties:{
    _id:{
      type: 'string',
      description: 'Comment ID'
    },
    user:{
      type: 'string',
      description: 'User ID'
    },
    content:{
      type: 'string',
      description: 'Comment text'
    },
    replies:{
      type: 'array',
      items:{
        type: 'object'
      }
    },
    likes:{
      type: 'array',
      items:{
        type: 'object'
      },
      description: 'array of likes'
    },
    createdAt:{
      type: 'string',
      description: 'Comment created date'
    },
    updatedAt:{
      type: 'string',
      description: 'Comment updated date'
    }
  }
}

export const swaggerLikeResponseSchema={
  type: 'object',
  properties:{
    _id:{
      type: 'string',
      description: 'Like ID'
    },
    likeableId: {
      type: 'string',
      description: 'Likeable ID'
    },
    user:{
      type: 'string',
      description: 'User ID'
    },
    onModel:{
      type: 'string',
      description: 'Model name'
    },
    createdAt:{
      type: 'string',
      description: 'Like created date'
    },
    updatedAt:{
      type: 'string',
      description: 'Like updated date'
    }
  }
}

export const swaggerUserCreateSchema={
  type: 'object',
  properties:{
    fullName:{
      type: 'string',
      description: 'User full name'
    },
    username:{
      type: 'string',
      description: 'User username'
    },
    email:{
      type: 'string',
      description: 'User email'
    },
    password:{
      type: 'string',
      description: 'User password'
    }
  }
}

export const swaggerUserSignUpResponseSchema={
  type: 'object',
  properties:{
    user:{
      type: 'object',
      properties:{
        _id:{
          type: 'string',
          description: 'User ID'
        },
        fullName:{
          type: 'string',
          description: 'User full name'
        },
        username:{
          type: 'string',
          description: 'User username'
        },
        email:{
          type: 'string',
          description: 'User email'
        },
        avatar:{
          type: 'string',
          description: 'User avatar'
        },
        role:{
          type: 'string',
          description: 'User role'
        },
        createdAt:{
          type: 'string',
          description: 'User created date'
        },
        updatedAt:{
          type: 'string',
          description: 'User updated date'
        }
      }
    },
    accessToken:{
      type: 'string',
      description: 'Access token'
    },
    refreshToken:{
      type: 'string',
      description: 'Refresh token'
    }
  }
}

export const swaggerUserLoginSchema={
  type: 'object',
  properties:{
    identifier:{
      type: 'string',
      description: 'User email'
    },
    password:{
      type: 'string',
      description: 'User password'
    }
  }
}

export const swaggerUserLoginResponseSchema={
  type: 'object',
  properties:{
    user:{
      type: 'object',
      properties:{
        _id:{
          type: 'string',
          description: 'User ID'
        },
        fullName:{
          type: 'string',
          description: 'User full name'
        },
        username:{
          type: 'string',
          description: 'User username'
        },
        email:{
          type: 'string',
          description: 'User email'
        },
        avatar:{
          type: 'string',
          description: 'User avatar'
        },
        role:{
          type: 'string',
          description: 'User role'
        },
        createdAt:{
          type: 'string',
          description: 'User created date'
        },
        updatedAt:{
          type: 'string',
          description: 'User updated date'
        }
      }
    },
    accessToken:{
      type: 'string',
      description: 'Access token'
    },
    refreshToken:{
      type: 'string',
      description: 'Refresh token'
    }
  }
}