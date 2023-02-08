const express = require('express')
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require('../controller/userController')
const PostController = require('../controller/PostController')

//user
router.post("/api/register", userController.userRegister);
router.post("/api/login", userController.userLogin);
router.post("/api/forget", userController.forgetPassword);

// router.use(auth);

//post
router.get("/api/:id", PostController.getPost); //getpost
router.post("/api/createpost", PostController.createPost); //createpost
router.put("/api/:id", PostController.updatePost); //updatepost
router.delete("/api/:id", PostController.deletePost); //deletepost
router.put("/api/:id/like", PostController.likePost); //likepost
router.put("/api/:id/comment", PostController.commentOnPost) //commentpost


module.exports = router