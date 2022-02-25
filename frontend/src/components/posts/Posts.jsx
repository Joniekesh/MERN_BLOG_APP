import "./posts.css";
import Post from "../post/Post";

const Posts = ({ posts }) => {
	return (
		<div className="posts">
			{posts.length > 0 ? (
				posts.map((post) => <Post key={post._id} post={post} />)
			) : (
				<h4>No posts to show</h4>
			)}
		</div>
	);
};

export default Posts;
