const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const auth = require("../middleware/auth");

// @desc   Create category
// @route  POST /api/categories
// @access Private
router.post("/", auth, async (req, res) => {
	try {
		const cat = new Category({ name: req.body.name });

		const createdCat = await cat.save();
		res.status(201).json(createdCat);
	} catch (err) {
		console.log(err.message);
		res.status(400).send("Server Error");
	}
});

// @desc   Fetch all categories
// @route  GET /api/categories
// @access Private
router.get("/", async (req, res) => {
	try {
		const cats = await Category.find({});

		res.status(200).json(cats);
	} catch (err) {
		console.log(err.message);
		res.status(400).send("Server Error");
	}
});

module.exports = router;
