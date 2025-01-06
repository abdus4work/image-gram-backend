import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    onModel:{
      type:String,
      enum:['Post','Comment'],
      required:[true,'onModel is required']
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:[true,'User is required']
    },
    likeableId:{
      type:mongoose.Schema.Types.ObjectId,
      required:[true,'likeableId is required']
    },
  },
  {
    timestamps:true
  }
)

const likeModel = mongoose.model('Like',likeSchema);

export default likeModel;