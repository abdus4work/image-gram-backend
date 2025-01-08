import mongoose from 'mongoose';

import { fetchLikeable } from '../service/likeService.js';

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



likeSchema.pre('findOneAndDelete', async function(next){
  const id = this.getFilter()._id;
  const doc = await this.model.findOne({_id:id});
  if(doc){
    const likeable = await fetchLikeable(doc.onModel,doc.likeableId);
    if(!likeable){
      throw new Error('Likeable not found');
    }
    likeable.likes.pull(doc._id);
    await likeable.save();
  }
  next();
})

const likeModel = mongoose.model('Like',likeSchema);

export default likeModel;