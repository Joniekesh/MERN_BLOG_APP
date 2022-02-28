const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const generateToken = require("../middleware/generateToken");

// @desc   Register User
// @route  POST /api/users
// @access Public
router.post(
	"/",
	[
		check("name", "Name is required").notEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("password", "Please enter password of 6 or more characters").isLength(
			{ min: 6 }
		),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({
					errors: [
						{ msg: `User with ${email} already exists in the database` },
					],
				});
			}

			user = new User({
				name,
				email,
				password,
			});
			await user.save();

			res.status(201).json({
				token: generateToken(user._id),
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @desc   Update user
// @route  PUT /api/users/me
// @access Private
router.put("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			res.status(404).json({ msg: "User not found" });
		}

		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.avatar = req.body.avatar || user.avatar;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const upDatedUser = await user.save();

		res.json(upDatedUser);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @desc   Delete user
// @route DELETE /api/users
// @access Private
router.delete("/", auth, async (req, res) => {
	try {
		await User.findOneAndRemove({ _id: req.user.id }),
			res.json({ msg: "User deleted" });
	} catch (err) {
		console.log(err.message);
		res.status(400).send("Server Error");
	}
});

module.exports = router;
