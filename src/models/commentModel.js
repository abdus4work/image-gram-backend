import mongoose from 'mongoose';

import commentRepository from '../repository/commentRepository.js';
import likeRepository from '../repository/likeRepository.js';
import { fetchCommentable } from '../service/commentService.js';

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },
    onModel: {
      type: String,
      enum: ['Post', 'Comment'],
      required: [true, 'onModel is required']
    },
    commentableId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'likeableId is required']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    replies: [
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
  {
    timestamps: true
  }
);

commentSchema.pre('findOneAndDelete', async function (next) {
  try {
    const id = this.getFilter()._id;
    const doc = await this.model.findOne({ _id: id });
    if (!doc) {
      next();
    }
    const commentable = await fetchCommentable(doc.onModel, doc.commentableId);
    if (!commentable) {
      throw new Error('Commentable not found');
    }
    if (doc.onModel === 'Post') {
      commentable.comments?.pull(doc._id);
    } else if (doc.onModel === 'Comment') {
      commentable.replies?.pull(doc._id);
    }

    if (doc.likes.length > 0) {
      await Promise.all(
        doc.likes.map(async (likeId) => {
          await likeRepository.delete(likeId);
        })
      );
    }
    if (doc.replies.length > 0) {
      await Promise.all(
        doc.replies.map(async (replyId) => {
          await commentRepository.delete(replyId);
        })
      );
    }
    await commentable.save();
    next();
  } catch (err) {
    next(err);
  }
});

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;
