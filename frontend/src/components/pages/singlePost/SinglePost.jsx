import "./singlePost.css";
import SideBar from "../../sidebar/SideBar";
import SinglePostDetails from "../../siglePostDetails/SinglePostDetails";

const SinglePost = ({ user }) => {
	return (
		<div className="singlePost">
			<div className="container">
				<div className="singlePostWrapper">
					<SinglePostDetails user={user} />
					<SideBar />
				</div>
			</div>
		</div>
	);
};

export default SinglePost;
