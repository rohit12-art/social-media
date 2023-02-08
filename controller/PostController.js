const Post = require('../model/Post')

const getPost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
}

const createPost = async(req,res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(err);
    }
}

//update a post

const updatePost = async(req,res) => {
    try {

    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
           await post.updateOne({ $set:req.body });
           res.status(200).json("the post has been updated");
    }else{
        res.status(403).json("you can update only your post")
    }
        
    } catch (error) {
        res.status(500).json(err);
    }
}

//delete post

const deletePost = async(req,res) => {
    try {

    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
           await post.deleteOne();
           res.status(200).json("the post has been deleted");
    }else{
        res.status(403).json("you can delete only your post")
    }
        
    } catch (error) {
        res.status(500).json(err);
    }
}

//like a post
const likePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push : { likes: req.body.userId } });
            res.status(200).json("The post has been liked")
        }else{
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    }catch(error){
        res.status(500).json(error);
    }
}

const commentOnPost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if(!post.comments.includes(req.body.userId)){
            await post.updateOne({ $push: { comments: req.body.userId } });
            res.status(200).json("The post has one comment")
        }else{
            await post.updateOne({ $pull: { comments: req.body.userId } });
            res.status(200).json("The comment has deleted");
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
  };

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    commentOnPost,
}