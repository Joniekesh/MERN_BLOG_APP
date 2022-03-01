const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const User = require("../models/User");

// @desc   Create post
// @route  POST /api/posts
// @access Private
router.post(
	"/",
	[
		check("title", "Title is required").notEmpty(),
		check("desc", "Description is required").notEmpty(),
		check("category", "Post category is required").notEmpty(),
	],
	auth,
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, desc, category, photo } = req.body;

		try {
			const user = await User.findById(req.user.id);

			const newPost = new Post({
				name: req.user.name,
				user: req.user.id,
				avatar: req.user.avatar,
				title,
				desc,
				category,
				photo,
			});

			const savedPost = await newPost.save();

			res.json(savedPost);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Get post by ID
// @route  GET /api/posts/:id
// @access Public
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		res.json(post);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Post not found" });
		}
		res.status(500).send("Server Error");
	}
});

// @desc   Get all posts
// @route  GET /api/posts
// @access Public
router.get("/", async (req, res) => {
	const categoryName = req.query.cat;
	const user = req.query.user;

	try {
		let posts;

		if (user) {
			posts = await Post.find({ user });
		} else if (categoryName) {
			posts = await Post.find({
				category: {
					$in: [categoryName],
				},
			});
		} else {
			posts = await Post.find();
		}
		res.status(200).json(posts);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Update a post
// @route  PUT /api/post/:id
// @access Private
router.put("/:id", auth, async (req, res) => {
	const { title, desc, category, photo } = req.body;

	try {
		const post = await Post.findById(req.params.id);
		const user = await User.findById(req.user.id);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		if (post.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to update this post" });
		}
		post.photo = photo || post.photo;
		post.title = title || post.title;
		post.desc = desc || post.desc;
		post.category = category || post.category;

		const updatedPost = await post.save();

		res.json(updatedPost);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			res.status(404).json({ msg: "Post not found" });
			res.status(500).send("Server Error");
		}
	}
});

// @desc   Like a post
// @route  PUT /api/posts/like/:postId
// @access Public
router.put("/like/:postId", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: "Post has already been liked" });
		}

		post.likes.unshift({ user: req.user.id });

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			res.status(400).json({ msg: "Post not found" });
			res.status(500).send("Server Error");
		}
	}
});

// @desc   Unlike a post
// @route  PUT /api/posts/unlike/:id
// @access Private
router.put("/unlike/:postId", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
			return res.status(400).json({ msg: "Post has not been liked" });
		}

		post.likes = post.likes.filter(
			({ user }) => user.toString() !== req.user.id
		);

		await post.save();

		res.json(post.likes);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			res.status(400).json({ msg: "Post not found" });
			res.status(500).send("Server Error");
		}
	}
});

// @desc   Delete a post
// @route  DELETE /api/posts/:id
// @access Private
router.delete("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		const user = await Post.findById(req.user.id);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		if (post.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to delete this post" });
		}

		await post.remove();

		res.json("Post removed");
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			res.status(404).json({ msg: "Post not found" });
			res.status(500).send("Server Error");
		}
	}
});

// @desc   Comment on a post
// @route  POST /api/posts/comments/:postId
// @access Public
router.post(
	"/comments/:postId",
	auth,
	[check("desc", "Description is required").notEmpty()],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const post = await Post.findById(req.params.postId);
			const user = await User.findById(req.user.id);

			if (!post) {
				return res.status(404).json({ errors: [{ msg: "Post not found" }] });
			}

			const comment = {
				user: req.user.id,
				name: user.name,
				avatar: user.avatar,
				desc: req.body.desc,
			};

			post.comments.unshift(comment);
			await post.save();

			res.json(post.comments);
		} catch (err) {
			console.log(err.message);
			if (err.kind == "ObjectId") {
				res.status(400).json({ msg: "Post not found" });
				res.status(500).send("Server Error");
			}
		}
	}
);

// @desc   Delete a comment
// @route  DELETE /api/posts/comments/:postId/:commentId
// @access Private
router.delete("/comments/:postId/:commentId", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		const comment = post.comments.find(
			(comment) => comment._id.toString() === req.params.commentId
		);

		if (!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}

		if (comment.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to delete this comment" });
		}

		post.comments = post.comments.filter(
			({ id }) => id != req.params.commentId
		);

		await post.save();

		res.json("Comment deleted");
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			res.status(404).json({ msg: "Comment not found" });
			res.status(500).send("Server Error");
		}
	}
});

// @desc   Update comment
// @route  PUT /api/posts/comments/:postId/:commentId
// @access Private
router.put("/comments/:postId/:commentId", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}

		const comment = post.comments.find(
			(comment) => comment._id.toString() === req.params.commentId
		);

		if (!comment) {
			return res.status(404).json({ msg: "Comment not found" });
		}

		if (comment.user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "You are not authorized to update this comment" });
		}

		comment.desc = req.body.desc || comment.desc;

		updatedComment = await post.save();
		res.json(updatedComment);
	} catch (err) {
		console.log(err.message);
		if (err.kind == "ObjectId") {
			res.status(404).json({ msg: "Comment not found" });
			res.status(500).send("Server Error");
		}
	}
});

module.exports = router;
