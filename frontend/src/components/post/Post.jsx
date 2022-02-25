import "./post.css";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
	const PF = "http://localhost:5000/images/";

	return (
		<div className="post">
			<div className="postWrapper">
				<Link to={`/post/${post._id}`}>
					<p className="postTitle">{post.title.substr(0, 60)}...</p>
				</Link>
				{post.photo && (
					<img className="postImg" src={PF + post?.photo} alt="" />
				)}
				<div className="postItems">
					<div className="postInfo">
						<div className="info">
							<div className="authordiv">
								<span className="author">Author:</span>
								<span>{post.name}</span>
							</div>
							<p className="date">{new Date(post.createdAt).toDateString()}</p>
						</div>
						<div className="reactions">
							<div className="likes">
								<span>{post.likes.length}</span>
								<i className="far fa-thumbs-up"></i>
							</div>
							<div className="postComments">
								<span className="postCommentCount">{post.comments.length}</span>
								<span>Comments</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
