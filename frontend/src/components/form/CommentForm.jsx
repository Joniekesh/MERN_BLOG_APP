import "./commentForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CommentForm = ({ post, setPost, user }) => {
	const [desc, setDesc] = useState();
	const [comment, setComment] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		const newComment = {
			user: user._id,
			name: user.name,
			avatar: user.avatar,
			desc,
		};

		try {
			const res = await axios.post(
				`/posts/comments/${post._id}`,
				newComment,
				config
			);
			setComment(res.data);
			setPost({ ...post, comment });

			window.location.reload();
		} catch (error) {}
	};

	return (
		<div className="commentForm">
			{user ? (
				<h2 className="commentTitle">Add Comments</h2>
			) : (
				<h2 className="commentTitle">
					Please <Link to="/login">login </Link>to add comments
				</h2>
			)}
			<form onSubmit={handleSubmit}>
				<textarea
					className="commentTextArea"
					rows="5"
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
				></textarea>
				<button className="commentBtn" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default CommentForm;
