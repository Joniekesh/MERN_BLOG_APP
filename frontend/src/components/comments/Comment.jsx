import "./comment.css";
import { format } from "timeago.js";
import axios from "axios";
import { useState } from "react";

const Comment = ({ comment, user, post }) => {
	const [desc, setDesc] = useState("");
	const [isUpdate, setIsUpdate] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const PF = "http://localhost:5000/images/";

	const handleEdit = async () => {
		console.log("edit");
	};

	const handleDelete = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		try {
			await axios.delete(`/posts/comments/${post._id}/${comment._id}`, config);
			window.location.reload();
			return setSuccess("Comment removed");
		} catch (err) {
			const error = err.response.data;

			setTimeout(() => {
				setSuccess("");
				setError("");
			}, 5000);
			return setError(error.msg);
		}
	};

	return (
		<>
			<div className="commentWrapper">
				{success && <span className="success">{success}</span>}
				{error && <span className="error">{error}</span>}
				<div className="commentTop">
					<div className="commentUserInfo">
						<img className="commentImg" src={PF + user?.avatar} alt="" />

						<span className="commentNanme">{comment.name}</span>
					</div>
					{isUpdate ? (
						<textarea
							value={comment.desc}
							className="commentUpdate"
							onChange={(e) => setDesc(e.target.value)}
						></textarea>
					) : (
						<p className="commentItem">{comment.desc} </p>
					)}
				</div>
				<div className="commentBottom">
					{!isUpdate && (
						<span className="commentDate">{format(comment.date)}</span>
					)}
					{user && user._id === comment.user && (
						<div className="reaction">
							{isUpdate ? (
								<button className="commentUpdateBtn">Update</button>
							) : (
								<>
									<span
										className="commentEdit"
										onClick={() => setIsUpdate(true)}
									>
										Edit
									</span>
									<span className="commentDelete" onClick={handleDelete}>
										Delete
									</span>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Comment;
