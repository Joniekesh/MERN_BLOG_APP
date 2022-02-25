const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");
const auth = require("../middleware/auth");

// @desc   Get logged in user,
// @route  GET /api/auth/me
// @access Private
router.get("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");

		if (!user) {
			return res.status(404).json({ msg: "User not not" });
		}

		res.status(200).json(user);
	} catch (err) {
		console.log(err.message);
		res.status(400).send("Server Error");
	}
});

// @desc   Login User
// @route  POST /api/auth
// @access Public
router.post(
	"/",
	[
		check("email", "Please enter a valid email").isEmail(),
		check(
			"password",
			"Please enter a password of 6 or more characters"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials" }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials" }] });
			}

			res.status(200).json({
				token: generateToken(user._id),
			});
		} catch (err) {
			console.log(err.message);
		}
	}
);

module.exports = router;
