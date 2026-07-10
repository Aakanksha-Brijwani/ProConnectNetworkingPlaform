import profile from "../models/profile.model.js";
import User from "../models/user.model.js";
import Post from "../models/posts.model.js";
import bcrypt from "bcrypt";
import Comment from "../models/comments.model.js";
export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "RUNNING" });
};

export const createPost = async (req, res) => {
 console.log("CREATE POST CONTROLLER HIT");
  const { token } = req.body;

  try {
    console.log("Creating post...");
    console.log("BODY:", req.body);

    const user = await User.findOne({ token: token });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      userId: user._id,
      body: req.body.body,
      active: true,
      media: req.file ? req.file.filename : "",
      fileType: req.file ? req.file.mimetype.split("/")[1] : "",
    });

    console.log("NEW POST:", newPost);

    await newPost.save();

    console.log("POST SAVED");

    return res.status(201).json({
      message: "Post created successfully",
    });

  } catch (error) {
    console.log("CREATE POST ERROR:");
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// export const createPost = async (req, res) => {
//   const { token } = req.body;

//   try {
//     const user = await User.findOne({ token: token });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const newPost = new Post({
//       userId : user._id,
//       body: req.body.body,
//       media: req.file != undefined ? req.file.filename : "",
//       fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
//     });
//     await newPost.save();
//     return res.status(201).json({ message: "Post created successfully" });
//   } catch (error) {
//   console.log("CREATE POST ERROR:", error);
//   return res.status(500).json({
//     message: error.message,
//   });
// }
// };

// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().populate(
//       "userId",
//       "name username email profilePicture",
//     );
//     return res.json(posts);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const getAllPosts = async (req, res) => {
  try {
    // const posts = await Post.find().populate(
    //   "userId",
    //   "name username email profilePicture"
    // );
    const posts = await Post.find()
    .populate("userId", "name username email profilePicture")
    .populate("likes", "_id");

    // Remove posts whose user has been deleted
    const validPosts = posts.filter(post => post.userId);

    return res.json(validPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { token, post_id } = req.body;

  try {
    const user = await User.findOne({ token: token }).select("_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const post = await Post.findOne({ _id: post_id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await Comment.deleteMany({
    postId: post_id,
  });

    await Post.deleteOne({ _id: post_id });

    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  const { token, post_id, commentBody } = req.body;

  try {
    const user = await User.findOne({ token: token }).select("_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const post = await Post.findOne({ _id: post_id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
  userId: user._id,
  postId: post_id,
  body: commentBody,
});

await comment.save();
    return res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const get_comments_by_post = async (req, res) => {
//   const { post_id } = req.query;

//   try {
//     const post = await Post.findOne({ _id: post_id });

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

// const comments = await Comment.find({
//     postId: post_id
// });
//     return res.json(comments.reverse());
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const get_comments_by_post = async (req, res) => {
  const { post_id } = req.query;

  try {
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ postId: post_id })
      .populate(
        "userId",
        "name username email profilePicture"
      );

    return res.json(comments.reverse());

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const delete_comment_of_user = async (req, res) => {
  const { token, comment_id } = req.body;

  try {
    const user = await User.findOne({ token: token }).select("_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const comment = await Comment.findOne({ _id: comment_id });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Comment.deleteOne({ _id: comment_id });
    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const increment_like = async (req, res) => {
//   const { token, post_id } = req.body;

//   try {
   
//     const post = await Post.findOne({ _id: post_id });

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }
    
//     post.likes=post.likes+1;

//     await post.save();

//     return res.json({ message: "likes incremented successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

export const toggleLike = async (req, res) => {
    const { token, post_id } = req.body;

    try {
        const user = await User.findOne({ token });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const post = await Post.findById(post_id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const index = post.likes.findIndex(
            (id) => id.toString() === user._id.toString()
        );

        if (index !== -1) {
            post.likes.splice(index, 1);

            await post.save();

            return res.json({
                message: "Post unliked"
            });
        }

        post.likes.push(user._id);

        await post.save();

        return res.json({
            message: "Post liked"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};