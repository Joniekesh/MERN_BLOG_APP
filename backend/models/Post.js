const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
		},
		name: {
			type: String,
		},
		avatar: {
			type: String,
			default: "",
		},
		title: {
			type: String,
			required: true,
			unique: true,
			max: 100,
		},
		desc: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			default: "",
		},
		category: {
			type: String,
			required: true,
		},
		likes: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
				},
			},
		],
		comments: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
				},
				name: {
					type: String,
				},
				avatar: {
					type: String,
					default: "",
				},
				desc: {
					type: String,
					required: true,
				},
				likes: [
					{
						user: {
							type: mongoose.Schema.Types.ObjectId,
						},
					},
				],
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
