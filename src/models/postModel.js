import mongoose from 'mongoose';

import commentRepository from '../repository/commentRepository.js';
import likeRepository from '../repository/likeRepository.js';

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      minLength: [3, 'Caption should be at least 3 characters long']
    },
    image: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
      }
    ]
  },
  { timestamps: true }
);

postSchema.pre('findOneAndDelete', async function (next) {
  try {
    const id = this.getQuery()['_id'];
    const doc = await this.model.findOne({ _id: id });
    if (!doc) {
      next();
    }
    if (doc.comments.length > 0) {
      await Promise.all(
        doc.comments.map(async (commentId) => {
          await commentRepository.delete(commentId);
        })
      );
    }

    if (doc.likes.length > 0) {
      await Promise.all(
        doc.likes.map(async (likeId) => {
          await likeRepository.delete(likeId);
        })
      );
    }
  } catch (err) {
    next(err);
  }
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;
