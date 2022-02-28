import "./posts.css";
import Post from "../post/Post";

const Posts = ({ posts }) => {
	return (
		<div className="posts">
			{posts.length > 0 ? (
				posts.map((post) => <Post key={post._id} post={post} />)
			) : (
				<h1 style={{ opacity: "0.6" }}>No post yet for this Category</h1>
			)}
		</div>
	);
};

export default Posts;
