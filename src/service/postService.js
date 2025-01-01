import cloudinaryConfig from '../configs/cloudinaryConfig.js';
import configs from '../configs/serverConfig.js';
import postRepository from '../repository/postRepository.js';


export const createPostService = async (data)=>{
  return await postRepository.create(data);
}

export const getAllPostsService = async (page,limit)=>{
  const posts = await postRepository.getAll('user',null,page,limit);
  const totalPosts = await postRepository.countAllPosts();
  const totalPages = Math.ceil(totalPosts/limit);
  const meta = {totalPosts,totalPages,page,limit};
  return {data:posts,meta};
}

export const generateSignedUrlService = async ()=>{
  const timestamp = Math.round(new Date().getTime()/1000+60);
  const signature = cloudinaryConfig.utils.api_sign_request({timestamp},configs.CLOUDINARY_API_SECRET);
  return {signature,timestamp};
}