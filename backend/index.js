const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { User, Post } = require("./models/schema"); // Import your models

const app = express();
app.use(bodyParser.json());
app.use(cors());

const secret = "your_jwt_secret";

// Middleware for checking JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

// User registration

app.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ id: user.id, username: user.username }, secret);
  res.json({ token });
});

// Create a new post
app.post("/posts", authenticateJWT, async (req, res) => {
  const post = new Post({ user_id: req.user.id, content: req.body.content });
  await post.save();
  res.json(post);
});

// Retrieve all posts with aggregation for pagination
app.get("/posts", authenticateJWT, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Get total count of posts
    const totalCount = await Post.countDocuments();

    // Get paginated posts with user data
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);

    // Send response with posts and total count
    res.json({ totalCount, posts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.post("/posts/:postId/like", authenticateJWT, async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).send("Post not found.");

  if (!post.likes.includes(req.body.user)) {
    post.likes.push(req.body.user);
  } else {
    post.likes.pull(req.body.user);
  }
  await post.save();

  res.json(post);
});

// Update followers and following
app.post("/users/:userId/follow", authenticateJWT, async (req, res) => {
  const userToFollow = await User.findById(req.params.userId);
  if (!userToFollow) return res.status(404).send("User not found.");

  const currentUser = await User.findById(req.body.user);

  if (!userToFollow.followers.includes(currentUser._id)) {
    userToFollow.followers.push(currentUser._id);
    currentUser.following.push(userToFollow._id);
  } else {
    userToFollow.followers.pull(currentUser._id);
    currentUser.following.pull(userToFollow._id);
  }

  await userToFollow.save();
  await currentUser.save();

  res.json({ userToFollow, currentUser });
});

// Get user profile with follow status
app.get("/users/:userId", authenticateJWT, async (req, res) => {
  const user = await User.findById(req.params.userId).lean();
  const currentUser = await User.findById(req.user.id).lean();

  user.isFollowedByCurrentUser = currentUser.following.includes(user._id);

  res.json(user);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
