import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    caption:{
      type: String,
      required: true,
      minLength:[3, 'Caption should be at least 3 characters long'],
    },
    image:{
      type: String,
      required: true,
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      }
    ],
    likes:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Like',
      }
  ]
  },
  { timestamps: true }
)

const postModel = mongoose.model('Post', postSchema);

export default postModel;