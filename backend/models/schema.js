const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/social_media", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const postSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// const likeSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   post_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Post",
//     required: true,
//   },
// });

// const followSchema = new mongoose.Schema({
//   follower_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   following_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
// const Like = mongoose.model("Like", likeSchema);
// const Follow = mongoose.model("Follow", followSchema);

module.exports = {
  User,
  Post,
  // Like,
  // Follow,
};
