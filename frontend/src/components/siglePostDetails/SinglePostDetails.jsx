import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import Comment from "../comments/Comment";
import CommentForm from "../form/CommentForm";
import "./singlePostDetails.css";

const SinglePostDetails = ({ user }) => {
	const [post, setPost] = useState({});
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [file, setFile] = useState("");
	const [category, setCategory] = useState("");
	const [likes, setLikes] = useState(0);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const location = useLocation();
	const path = location.pathname.split("/")[2];
	const [isUpdate, setIsUpdate] = useState(false);

	const PF = "http://localhost:5000/images/";

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const res = await axios.get(`/posts/${path}`);
				setPost(res.data);
				setTitle(res.data.title);
				setDesc(res.data.desc);
				setCategory(res.data.category);
			} catch (err) {
				console.log(err);
			}
		};
		fetchPost();
	}, [path]);

	const handleUpdate = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		const updatedPost = {
			user: user._id,
			name: user.name,
			title,
			desc,
			category,
		};

		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append("name", filename);
			data.append("file", file);

			updatedPost.photo = filename;

			try {
				await axios.post("/upload", data);
			} catch (error) {}
		}

		try {
			const res = await axios.put(`/posts/${post._id}`, updatedPost, config);
			setIsUpdate(false);
			setTimeout(() => {
				setSuccess("");
			}, 5000);
			window.location.reload();
			return setSuccess("Post Updated");
		} catch (error) {}
	};

	const handleDelete = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		try {
			await axios.delete(`/posts/${post._id}`, config);

			setTimeout(() => {
				setSuccess("");
			}, 5000);
			window.location.replace("/");
			return setSuccess("Post Removed");
		} catch (error) {}
	};

	const addLike = async () => {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		const newLike = {
			user: user._id,
		};
		try {
			const res = await axios.put(
				`/posts/like/${post._id}`,
				{ newLike },
				config
			);
			setLikes(res.data);
			setPost({ ...post, likes });

			window.location.reload();
			return setSuccess("Post Liked");
		} catch (err) {
			const error = err.response.data;
			if (error) {
				setTimeout(() => {
					setError("");
					setSuccess("");
				}, 5000);
				return setError(error.msg);
			}
		}
	};
	const removeLike = async () => {
		const newLike = {
			user: user._id,
		};
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};
		try {
			const res = await axios.put(
				`/posts/unlike/${post._id}`,
				{ newLike },
				config
			);
			setLikes(res.data);
			setPost({ ...post, likes });

			setTimeout(() => {
				setSuccess("");
			}, 5000);
			window.location.reload();
			return setSuccess("Post Unliked");
		} catch (err) {
			const error = err.response.data;
			if (error) {
				setTimeout(() => {
					setError("");
				}, 5000);
				return setError(error.msg);
			}
		}
	};

	return (
		<div className="singlePostDetails">
			{success && <p className="success">{success}</p>}
			{error && <p className="error">{error}</p>}

			<div className="singlePostDetailsWrapper">
				{!isUpdate ? (
					post.photo && (
						<img
							className="singlePostDetailsWrapperImg"
							src={PF + post?.photo}
							alt=""
						/>
					)
				) : (
					<div className="updateFileInput">
						<img
							className="singlePostDetailsWrapperImg"
							src={PF + post?.photo}
						/>
						<label htmlFor="fileInput">
							<i className=" fileInputIcon fas fa-plus"></i>
							<input
								className="writeFormGroupInput"
								type="file"
								id="fileInput"
								style={{ display: "none" }}
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</label>
					</div>
				)}
				{isUpdate ? (
					<select
						className="updateSelect"
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value={category}>{category}</option>
						<option value="sports">sports</option>
						<option value="music">music</option>
						<option value="entertainment">entertainment</option>
						<option value="food">food</option>
						<option value="culture">culture</option>
						<option value="tourism">tourism</option>
						<option value="technology">technology</option>
						<option value="agriculture">agriculture</option>
						<option value="education">education</option>
						<option value="lifestyle">lifestyle</option>
					</select>
				) : (
					<p className="postCategory">{category}</p>
				)}

				{isUpdate ? (
					<input
						type="text"
						autoFocus
						value={title}
						className="singlePostEditTitle"
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<>
						<span className="singlePostDetailsTitle">
							{post.title?.length > 200
								? post.title.substr(0, 200)
								: post.title}
						</span>
						<p className="singlePostDate">
							{new Date(post.createdAt).toDateString()}
						</p>
						<div className="authorDetails">
							<div className="authorSingle">
								<img
									className="authorSingleLeft"
									src={PF + user?.avatar}
									alt=""
								/>
								<div className="authSingleRight">
									<span className="authorLeft">Author: </span>
									<Link to={`/?user=${post.user}`}>
										<span className="authorRight">{post.name}</span>
									</Link>
								</div>
							</div>
							<div className="editDelete">
								{user?._id === post.user && (
									<>
										<i
											className=" edit far fa-edit"
											onClick={() => setIsUpdate(true)}
										></i>
										<i
											className=" delete far fa-trash-alt"
											onClick={handleDelete}
										></i>
									</>
								)}
							</div>
						</div>
					</>
				)}

				<hr className="line" />
				{isUpdate ? (
					<textarea
						rows="5"
						className="singlePostEditText"
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					></textarea>
				) : (
					<p className="singlePostDetailsDesc">{desc}</p>
				)}
				{isUpdate ? (
					<button onClick={handleUpdate} className="singlePostEditBtn">
						Update
					</button>
				) : (
					<>
						<hr className="line" />
						<div className="singlePostReactions">
							<div className="leftReaction">
								<i
									className=" likeReactionThumb far fa-thumbs-up"
									onClick={addLike}
								></i>
								<span className="likesCount">{post.likes?.length}</span>
								<i
									className=" unlikeReactionThumb far fa-thumbs-down"
									onClick={removeLike}
								></i>
							</div>
							<div className="rightReaction">
								<span className="rightReactionCount">
									{post.comments?.length}
								</span>
								<span>Comments</span>
							</div>
						</div>
						<hr />
					</>
				)}
			</div>
			{!isUpdate && (
				<>
					<CommentForm post={post} setPost={setPost} user={user} />
					{post.comments?.length > 0 ? (
						post.comments
							.map((comment) => (
								<Comment
									key={comment._id}
									comment={comment}
									post={post}
									user={user}
									setPost={setPost}
								/>
							))
							.reverse()
					) : (
						<h2 style={{ textAlign: "center", opacity: "0.6" }}>
							No comments for this post
						</h2>
					)}
				</>
			)}
		</div>
	);
};

export default SinglePostDetails;
